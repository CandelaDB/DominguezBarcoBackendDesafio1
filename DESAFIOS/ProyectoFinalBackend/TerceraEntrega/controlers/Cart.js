import Container from '../containers/containerChat';
import ContainerProductos from '../containers/containerProductos';

const carrito = new Container();
const producto = new ContainerProductos();

export const getCarrito = (req, res) => {
	const correo = req.user.username;
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	carrito.getCart(correo).then((carritos) => {
		res.render('UserLogin/carrito', { carritos, avatar, saludo });
	});
};

export const postProductoCarrito = (req, res) => {
	const correo = req.user.username;
	const idProducto = req.body.id;
	carrito.getCart(correo).then((cart) => {
		if (cart === null) {
			const newCart = {
				author: {
					name: req.user.name,
					lastName: req.user.lastName,
					address: req.user.address,
					phoneNumber: req.user.phoneNumber,
					username: req.user.username,
				},
				productos: [],
				timestamp: Date.now(),
			};
			carrito.addCart(newCart);
		}
	});
	producto.getId(idProducto).then((producto) => {
		let product = producto;
		carrito.updateCart(correo, { $push: { productos: product } });
	});
	res.redirect('/productos');
};
export const deleteProductoCarrito = (req, res) => {
	const idProducto = req.body.id;
	const idCarrito = req.user.username;

	producto.getId(idProducto).then((producto) => {
		let product = producto;
		carrito.updateCart(idCarrito, { $pull: { productos: product } });
	});
};

export const deleteCarrito = (req, res) => {
	carrito.deleteCart(req.user.username);
	res.redirect('/productos');
};