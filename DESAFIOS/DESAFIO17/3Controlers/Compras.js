import logger from '../0Config/Logger.js';
import ServicesCart from '../2Services/Cart.js';
import ServicesCompras from '../2Services/Compras.js';
import { Correo } from '../2Services/Nodemailer.js';
import Whatsapp from '../2Services/twilio.js';

const postCompra = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const mail = req.user.username;
	const telefono = req.user.phoneNumber;
	const carrito = await ServicesCart.getCart(mail);
	const compra = await ServicesCompras.postCompras(carrito);
	const asunto = `Compra exitosa ${compra._id}`;
	const mensaje = `<h1 style="color: blue;">${compra}</h1>`;
	const confirmacion = `compra exitosa su id de confirmacion ${compra._id} le llegara una copia a su correo y celular`;
	await Correo(mail, asunto, mensaje);
	await Whatsapp(telefono, asunto);
	await ServicesCart.deleteCart(mail);
	res.render('UserLogin/compra', { confirmacion });
};

export default postCompra;
