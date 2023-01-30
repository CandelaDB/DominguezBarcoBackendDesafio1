import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { normalize, schema } from "normalizr";

import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import { createServer } from "http";
import { ingresar, productos, registrarse, salir } from "./routers/routers.js";
import productosTest from "./routers/routersTest.js";
import container from "./containers/containerChat.js";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.port || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chat = new container();
const httpServer = createServer(app);
const io = new Server(httpServer);

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true};

app.set("views", "./views");
app.set("view engine", "pug");

app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://CandelaDB:Felipe26!@miprimercluster0.siwd3dh.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: advancedOptions
  }),
  secret: "coderhouse",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {maxAge: 600000},
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + "/Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/ingresar", ingresar);
app.use("/productos", productos);
app.use("/registrarse", registrarse);
app.use("/salir", salir);
app.use("/test", productosTest);

app.get('/', (req, res) => {
  res.redirect('/productos')
})

io.on("connection", async socket =>{

  const listaMensajes = await chat.getChat();
  const strin = JSON.stringify(listaMensajes);
  const data = JSON.parse(strin);
  const mensajes = {
    id: "backendCoder09",
    messages: data,
  };

  const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
  const messageSchema = new schema.Entity("message", {
    author: authorSchema,
  });
  const messagesSchema = new schema.Entity("messages", {
    messages: [messageSchema],
  });
  
  const messagesNorm = normalize(mensajes, messagesSchema);
  const compresion =100 - JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajes).length + "%";
  socket.emit("messages", messagesNorm);
  socket.emit("compres", compresion);

  socket.on("new-message", async data => {
    if (listaMensajes.length === 0) {
      return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1});
    };
    await chat.addChat({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1});

    io.sockets.emit("messages", messagesNorm);
  });
  
});

httpServer.listen(port, () => {
  console.log(`RUN http://localhost:${port}/ingresar`);
});