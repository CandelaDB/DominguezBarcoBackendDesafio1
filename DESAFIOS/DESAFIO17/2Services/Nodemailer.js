import { transporter } from '../0Config/ConnectNodemailer.js';
import logger from '../0Config/Logger.js';

export const Correo = async (to, subject, html) => {
	const mail = {
		from: 'Servidor Node.js',
		to: to,
		subject: subject,
		html: html,
	};
	try {
		const mensaje = await transporter.sendMail(mail);
		return mensaje;
	} catch (err) {
		logger.error(err);
	}
};
