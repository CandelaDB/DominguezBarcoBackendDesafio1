import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import { ingresar, productos, registrarse, salir, inicio, carrito, compras } from './router/routers.js';
import { createServer } from 'http';
import passport from 'passport';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import logger from './0Config/Logger.js';

dotenv.config();

const app = express();
const numCPUS = os.cpus().length;
const MONGO = process.env.MONGO;
const PORT = process.env.PORT;

if (cluster.isPrimary) {
	logger.info(`Master processID: ${process.pid} is running`);
	for (let i = 0; i < numCPUS; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		logger.info(`worker ${worker.process.pid} termino`);
		cluster.fork();
	});
} else {
	const httpServer = createServer(app);

	const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

	app.set('views', './views');
	app.set('view engine', 'pug');

	app.use(cookieParser());
	app.use(
		session({
			store: MongoStore.create({
				mongoUrl: MONGO,
				mongoOptions: advancedOptions,
			}),
			secret: 'coderhause',
			resave: false,
			saveUninitialized: false,
			rolling: true,
			cookie: {
				maxAge: 600000,
			},
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static('public'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/registrarse', registrarse);
	app.use('/ingresar', ingresar);
	app.use('/inicio', inicio);
	app.use('/productos', productos);
	app.use('/salir', salir);
	app.use('/carrito', carrito);
	app.use('/compras', compras);

	app.get('/', (req, res) => {
		res.redirect('/inicio');
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
	app.get('*', (req, res) => {
		const { url, method } = req;
		logger.warn(`Ruta ${method} ${url} no esta implementada`);
		res.send(`Ruta ${method} ${url} no esta implementada`);
	});

	httpServer.listen(PORT, () => {
		logger.info(`RUN http://localhost:${PORT} processID: ${process.pid}`);
	});
}