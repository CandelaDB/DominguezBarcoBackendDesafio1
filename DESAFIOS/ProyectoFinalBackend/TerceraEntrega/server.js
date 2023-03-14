import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { normalize, schema } from "normalizr";
import logger from "./logger.js";
import parseArgs from 'minimist';
import dotenv from 'dotenv';
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import { createServer } from "http";
import { ingresar, productos, registrarse, salir , inicio, carrito, compras } from "./routers/routers.js";
import productosTest from "./routers/routersTest.js";
import container from "./containers/containerChat.js";
import path from "path";
import { fileURLToPath } from "url";
import infoNoBloqueante from "./routers/infoNoBloqueante.js";
import infoBloqueante from "./routers/infoNoBloqueante.js";
import apiRandom from "./routers/apiRandom.js";

// Cluster
import cluster from 'cluster'
import os from 'os'

const config = {
    alias: { p: 'port', m: "modo"},
    default: { port: 8080, modo: "FORK"},
};

//export const args = parseArgs(process.argv.slice(2), config);
//export const PORT = args.port || 8080;
//const numCPUs = os.cpus().length
export const args = parseArgs(process.argv.slice(2), config);
export const PORT = process.env.PORT || 8080; 
const numCPUs = os.cpus().length

if (args.modo == "CLUSTER" && cluster.isPrimary) {
    logger.info(`Master processID: ${process.pid} is running`);
    logger.info(`numCPUs`)

    for (let index = 0; index < numCPUs; index++) {
    cluster.fork();

    cluster.on("exit", (worker) => {
        logger.info(`worker ${worker.process.pid} termino`);
    });
    }
} else {
    dotenv.config()


    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const httpServer = createServer(app);
    const chat = new container();
    const io = new Server(httpServer);

    const dataBase = process.env.MONGOCONNECT
    const urlPars = process.env.URLPARS
    const unified = process.env.UNIFIED

    const advancedOptions = {useNewUrlParser: urlPars, useUnifiedTopology:unified};

    const port = process.env.port || 8080;

    app.set("views", "./views");
    app.set("view engine", "pug");

    app.use(cookieParser());
    app.use(session({
    store: MongoStore.create({
        mongoUrl: dataBase,
        mongoOptions: advancedOptions
    }),
    secret: "secretito",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 600000},
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(express.static('public'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

  //------------------//
  //  Rutas de Acceso //
  //------------------//
    app.use("/ingresar", ingresar);
    app.use("/productos", productos);
    app.use("/registrarse", registrarse);
    app.use("/salir", salir);
    app.use('/inicio', inicio);
    app.use('/carrito', carrito);
	app.use('/compras', compras);
    app.use("/test", productosTest);
    app.use("/infoNoBloq", infoNoBloqueante);
    app.use("/infoBloq", infoBloqueante);
    app.use("/apirandom", apiRandom);
    app.get("/*", (req, res) => {
    logger.warn(`Ruta inexistente`);
    res.send("Ruta inexistente");
    })
    app.get('/', (req, res) => {
    res.redirect('/inicio');
    logger.info('redirected to /inicio');
    });
    app.get('/mensajes', (req, res) => {
		const user = req.user.username;
		const avatar = req.user.photo;
		const saludo = `Bienvenido ${user}`;
		if (req.user?.username) {
			return res.render('UserLogin/mensajes', { saludo, avatar });
		}
		if (req.user?.admin) {
			return res.render('Admin/mensajes', { saludo, avatar });
		}
		res.redirect('/');
	});


    io.on("connection", async socket =>{

    const listaMensajes = await chat.getChat();
    const strin = JSON.stringify(listaMensajes);
    const data = JSON.parse(strin);
    const mensajes = {
        id: "backendCoderProyectoFinal",
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

    function print(objeto) {
    console.log(util.inspect(objeto,false,12,true));
    };

    httpServer.listen(PORT, () => { 
        console.log(`RUN http://localhost:${PORT}/ingresar processID: ${process.pid}`);
        
        });
    //httpServer.listen(port, () => {
    //logger.info(`RUN http://localhost:${port}/ingresar processID: ${process.pid}`);
    //});
}