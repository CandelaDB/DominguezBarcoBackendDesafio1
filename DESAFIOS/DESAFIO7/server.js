import config  from "./confidb/mysqlconfi.js";
import ClienteSQL from "./metodos/sqlContainer.js";
import configChat  from "./confidb/sqlite3confi.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.static("./public"));
app.set("view engine", "ejs");

const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");

const sql = new ClienteSQL(config);
const sqlChat = new ClienteSQL(configChat);
sql.crearTabla();
sqlChat.crearChat();

    io.on("connection", async(socket) => {
    console.log("Nuevo usuario conectado");
    const products = await sql.listarArticulos();
    socket.emit("products", products);

    socket.on("newProduct", async(data)=>{
        await sql.insertarArticulos(data);
        const products = await sql.listarArticulos();
        io.sockets.emit("products", products)
    })

    const chat = await sqlChat.listarChat();
    socket.emit("messagesChat", chat);
    socket.on("newMsg", async(data)=>{
        await sqlChat.insertarChat(data);
        const chat = await sqlChat.listarChat();
        io.sockets.emit("messagesChat", chat)
    })
});

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));