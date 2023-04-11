import { normalize, denormalize } from 'normalizr'
import logger from "../loggers/loggers.js"
import getFakeProds from "../controllers/testConFaker.js"
import { schema } from 'normalizr'
import mensajesRepo from '../persistency/repository/mensajesRepo.js'

const mensajesMongoNorm = new mensajesRepo()


const author = new schema.Entity('author', {}, {idAttribute: 'email'});
const chat = new schema.Entity('chat', { 
    mensajes: [ { author } ]
})

const productosTest = getFakeProds()


const socketService =  async socket => {
    socket.emit('productos', productosTest)
    await mensajesMongoNorm.listarMensajes().then((mensjs) => { 
        return socket.emit('mensajes', mensjs)
    }).catch( err => { logger.error( `error productos: ${err}` ) })
    socket.on('new-prod', async (nuevoProd) =>  {
        productosTest.push(nuevoProd)
        io.sockets.emit('productos', productosTest)
    } )
    socket.on('new-msg', async (nuevoMsj) => {
        const msjs = await mensajesMongoNorm.listarMensajes()
        const mensajes = {
            result: msjs[0].result,
            entities: msjs[0].entities
        }
        const mensajesDenormalizado = denormalize(mensajes.result, chat, mensajes.entities)
        mensajesDenormalizado.mensajes.push( nuevoMsj )
        const mensajesNormalizados = normalize(mensajesDenormalizado, chat )
        await mensajesMongoNorm.insertarMensaje(mensajesNormalizados).then(
            () => mensajesMongoNorm.listarMensajes()
            ).then((res) => 
            io.sockets.emit('mensajes', res)
        )
    } )
}

export { socketService }