import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const USER = process.env.USER;
const PASS = process.env.PASS;

export const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: USER,
		pass: PASS,
	},
});