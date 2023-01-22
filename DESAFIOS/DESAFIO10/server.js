const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const productosTest = require('./router/routerTest');
const {ingresar, productos} = require('./router/router');
const container = require('./container/container');
const { normalize, denormalize, schema } = require('normalizr');
const util = require ('util');
const chat = new container();


const app = express();
const PORT = process.env.port || 8080;

const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true}

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
    mongoUrl: 'mongodb+srv://CandelaDB:Felipe26!@miprimercluster0.siwd3dh.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: advancedOptions
    }),
    secret: "coder",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 60000},
}));


app.use(express.static(__dirname + "/Public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', productos);
app.use('/test', productosTest);

io.on('connection', async socket =>{

    const listaMensajes = await chat.getChat()
    const strin = JSON.stringify(listaMensajes)
    const data = JSON.parse(strin)
    const mensajes = { id: 'desafio9', messages: data };
// ORIGINAL
    const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
    const messageSchema = new schema.Entity("message", {  author: authorSchema  });
    const messagesSchema = new schema.Entity("messages", {  messages: [messageSchema] });
    const messagesNorm = normalize(mensajes, messagesSchema);
// NORMALIZADO
    const compresion =100 - JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajes).length + "%"
    socket.emit('messages', messagesNorm)
    socket.emit('compres', compresion)

    socket.on('new-message', async data => {
    if (listaMensajes.length === 0) {
    return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1})
    }
    await chat.addChat({...data, fyh: new Date().toLocaleString(), id: listaMensajes.length +1})

    io.sockets.emit('messages', messagesNorm)
    })
})

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

httpServer.listen(PORT, () => {
	console.log(`Escuchando en puerto: ${PORT}`);
});