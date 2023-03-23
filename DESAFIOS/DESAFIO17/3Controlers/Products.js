import logger from '../0Config/Logger.js';
import ServicesProducts from '../2Services/Products.js';

export const getProduct = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const user = req.user;
	if (user === undefined) {
		const products = await ServicesProducts.getProduct();
		console.log(products);
		return res.render('User/productosUser', { products });
	}
	const saludo = `Bienvenido ${user.username}`;
	const avatar = user.photo;
	if (user.admin === true) {
		const products = await ServicesProducts.getProduct();
		return res.render('Admin/productosAdmin', { products, saludo, avatar });
	}
	const products = await ServicesProducts.getProduct();
	res.render('UserLogin/productosUserLogin', { products, saludo, avatar });
};

export const getProductName = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const name = req.body.nameb.charAt(0).toUpperCase() + req.body.nameb.slice(1);
	const user = req.user;
	const saludo = `Bienvenido ${user.username}`;
	const avatar = user.photo;
	if (user === undefined) {
		const products = await ServicesProducts.getProductName(name);
		return res.render('User/productosUser', { products });
	}
	if (user.admin === true) {
		const products = await ServicesProducts.getProductName(name);
		return res.render('Admin/productosAdmin', { products, saludo, avatar });
	}
	const products = await ServicesProducts.getProductName(name);
	res.render('UserLogin/productosUserLogin', { products, saludo, avatar });
};

export const postProduct = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const product = req.body;
	await ServicesProducts.postProduct(product);
	res.redirect('/productos');
};

export const updateProduct = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const id = req.params.id;
	const product = req.body;
	await ServicesProducts.updateProduct(id, product);
	res.redirect('/productos');
};

export const deleteProduct = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const id = req.params.id;
	await ServicesProducts.deleteProduct(id);
	res.redirect('/productos');
};
