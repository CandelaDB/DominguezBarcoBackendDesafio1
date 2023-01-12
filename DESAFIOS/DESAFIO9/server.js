import express from "express";
import productos from "./router/router";
import container from "./container/container";
import productosTest from "./router/routerTest";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { normalize, denormalize, schema } from 'normalizr'

const app = express();
const chat = new container();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = process.env.port || 8080;
app.use(express.static("./public"));
app.use('/productos', productos);
app.use('/test', productosTest);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.set('views', './views');

io.on('connection', async socket =>{

    const listaMensajes = await chat.getChat()
    const strin = JSON.stringify(listaMensajes)
    const data = JSON.parse(strin)
    const mensajes = {id: 'desafio9', messages: data};
    // ORIGINAL
    console.log('Tamaño de obj original: ' + JSON.stringify(mensajes).length)

    const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
    const messageSchema = new schema.Entity("message", {author: authorSchema});
    const messagesSchema = new schema.Entity("messages", {messages: [messageSchema]});
    const messagesNorm = normalize(mensajes, messagesSchema);
    // NORMALIZADO
    console.log('Tamaño de obj normalizado: ' + JSON.stringify(messagesNorm).length)
        // DENORMALIZADO
    const objDenormalizado = denormalize(messagesNorm.result, messagesSchema, messagesNorm.entities)
    console.log('Tamaño de obj denormalizado: ' + JSON.stringify(objDenormalizado).length)

    console.log('Porcentaje de compresion: ' + (100 - (JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajes).length)) + "%")

    socket.emit('messages', listaMensajes)

    socket.on('new-message', async data => {
        if (listaMensajes.length === 0) {
        return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1})
        }
        await chat.addChat({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1})
        
        io.sockets.emit('messages', listaMensajes)
    })
    })
    
  // UTILS
import util from 'util'

    function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
    }

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));