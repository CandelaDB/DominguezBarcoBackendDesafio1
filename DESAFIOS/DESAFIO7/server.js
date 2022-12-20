import config  from "./confidb/mysqlconfi.js";
import ClienteSQL from "./metodos/sqlContainer.js";
import configChat  from "./confidb/sqlite3confi.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.static("./public"));
app.set("view engine", "ejs");

const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");

//Armo la DB 
const sql = new ClienteSQL(config);
const sqlChat = new ClienteSQL(configChat);
sql.crearTabla();
sqlChat.crearChat();

    io.on("connection", async(socket) => {
    console.log("Nuevo usuario conectado");
//Productos    
    const products = await sql.listarArticulos();
    socket.emit("products", products);
//Recibo productos
    socket.on("newProduct", async(data)=>{
        await sql.insertarArticulos(data);
//Envio productos        
        const products = await sql.listarArticulos();
        io.sockets.emit("products", products)
    })
//MjsChat
    const chat = await sqlChat.listarChat();
    socket.emit("messagesChat", chat);
//Recibo msj    
    socket.on("newMsg", async(data)=>{
        await sqlChat.insertarChat(data);
//Envio los msj        
        const chat = await sqlChat.listarChat();
        io.sockets.emit("messagesChat", chat)
    })
});
app.get('/', (req,res) => {
    res.render("index", { titulo: "inicio" })
})

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));