import twilioClient from '../0Config/ConnectTwilio.js';
import logger from '../0Config/Logger.js';
import dotenv from 'dotenv';

dotenv.config();

const FROM = process.env.FROM;

const Whatsapp = async (to, body) => {
	const wps = {
		from: `whatsapp:${FROM}`,
		to: `whatsapp:+${to}`,
		body: body,
	};
	try {
		const mensaje = await twilioClient.messages.create(wps);
		return mensaje;
	} catch (err) {
		logger.error(err);
	}
};

export default Whatsapp;
