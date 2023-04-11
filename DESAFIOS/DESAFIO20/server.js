import { createServer } from "http"
import { Server } from "socket.io"
import { socketService } from './services/sockets.js'
import { sessionMongo } from './sessions/sessionMongoAtlas.js'
import session from "koa-session"
import passport from "koa-passport"
import parseArgs from 'yargs/yargs'
import { routerLoginYRegister } from './routes/loginYRegister.js'
import { routerOtras } from './routes/otras.js'
import { routerProductos } from './routes/productos.js'
import { routerProductosGraphql } from './routes/productosConGraphql.js'

import Koa from "koa"
import { koaBody } from "koa-body"
import serve from "koa-static"
import Pug from "koa-pug"
import path from "path"

const yargs = parseArgs(process.argv.slice(2))
const { puerto, _ } = yargs.alias({p: 'puerto'}).default({puerto: 8080}).argv
const PORT = puerto

const app = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer)

const __dirname = path.resolve('.');
const publicFiles = serve(path.join(__dirname, 'public'))
publicFiles._name = 'static /public'

app.use( publicFiles )

app.use( koaBody() )

app.use(session(sessionMongo, app))

const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    app: app
})

app.use( passport.initialize() )
app.use( passport.session() )

app.keys = ['shhhhhh', 'shhhhhhhhhhh'];
app.use( routerLoginYRegister.routes() )
app.use( routerOtras.routes() )
app.use( routerProductos.routes() )
app.use( routerProductosGraphql.routes() )

io.on('connection', socketService )

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} - PID: ${process.pid}`);
})