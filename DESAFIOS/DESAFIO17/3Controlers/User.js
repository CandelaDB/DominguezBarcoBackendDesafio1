import logger from '../0Config/Logger.js';
import ServicesCart from '../2Services/Cart.js';

export const getSingIn = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	if (req.isAuthenticated()) {
		res.redirect('/productos');
	}
	res.render('User/ingresar');
};

export const getSignUp = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	if (req.isAuthenticated()) {
		res.redirect('/productos');
	}
	res.render('User/registrarse');
};

export const getLogout = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const mail = req.user.username;
	const saludo = `Hasta luego ${mail}`;
	await ServicesCart.deleteCart(mail);
	req.logout((err) => {
		res.render('saludo', { saludo });
	});
};

export const getErrorLogin = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	res.render('User/login-error');
};

export const getErrorRegister = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	res.render('User/register-error');
};

export const getInicio = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	if (req.user === undefined) {
		return res.render('User/inicioUser');
	}
	const user = req.user;
	const avatar = user.photo;
	const saludo = `Bienvenido ${user.username}`;
	if (user.admin === true) {
		return res.render('Admin/inicioAdmin', { saludo, avatar });
	}
	res.render('UserLogin/inicioUserLogin', { saludo, avatar });
};
