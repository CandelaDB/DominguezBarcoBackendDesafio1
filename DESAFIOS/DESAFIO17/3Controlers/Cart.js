import logger from '../0Config/Logger.js';
import ServicesCart from '../2Services/Cart.js';
import ServicesProduct from '../2Services/Products.js';

export const getCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const Correo = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${Correo}`;
	const result = await ServicesCart.getCart(Correo);
	res.render('UserLogin/carrito', { result, avatar, saludo });
};

export const postProductCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const Usuario = req.user;
	const Correo = Usuario.username;
	const idProducto = req.body.id;
	const resultCart = await ServicesCart.getCart(Correo);
	if (resultCart === null) {
		ServicesCart.postCart(Usuario);
	}
	const resultProduct = await ServicesProduct.getProductId(idProducto);
	await ServicesCart.postProductCart(Correo, resultProduct);
	res.redirect('/productos');
};

export const deleteProductCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const correo = req.user.username;
	const idProducto = req.body.id;
	const resultProduct = await ServicesProduct.getProductId(idProducto);
	await ServicesCart.deleteProductCart(correo, resultProduct);
	res.redirect('/carrito');
};

export const deleteCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const correo = req.user.username;
	await ServicesCart.deleteCart(correo);
	res.redirect('/productos');
};
