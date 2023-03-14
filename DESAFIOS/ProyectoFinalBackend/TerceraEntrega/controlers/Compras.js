import containerCart from '../containers/Cart.js';
import containerCompras from '../containers/compras.js';
import { createTransport } from 'nodemailer';
import twilio from 'twilio'
import dotenv from 'dotenv';
import logger from '../logger.js';

dotenv.config();

const USER = process.env.USER;
const PASS = process.env.PASS;
const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;
const FROM = process.env.FROM;
const twilioClient = twilio(ACCOUNTSID, AUTHTOKEN)

const carrito = new containerCart();
const compras = new containerCompras();
const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: USER,
		pass: PASS,
	},
});

const postCompra = async (req, res) => {
	const correo = req.user.username;
	await carrito.getCart(correo).then(async (cart) => {
        await compras.addCompras({ compra: cart }).then(async(compra) => {
			const mailOptions = {
				from: 'Servidor Node.js',
				to: correo,
				subject: `Compra exitosa ${compra._id}`,
				html: `<h1 style="color: blue;">${compra.compra}</h1>`,
			};
			try {
				const mensaje = await transporter.sendMail(mailOptions);
			} catch (err) {
				logger.error(err);
			}
            await carrito.deleteCart(correo)
            let id= compra._id
            let confirmacion = `compra exitosa su id de confirmacion ${id} le llegara una copia a su correo y celular`
            await twilioClient.messages.create({
                body: confirmacion,
                from: `whatsapp:${FROM}`,
                to: `whatsapp:+${req.user.phoneNumber}`
            })
            res.render("UserLogin/compra", {confirmacion})
		});
	});
};

export default postCompra;