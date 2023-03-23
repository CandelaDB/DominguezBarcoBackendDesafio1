import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bCrypt from 'bcrypt';
import ServicesUser from '../2Services/User.js';
import { Correo } from '../2Services/Nodemailer.js';
import dotenv from 'dotenv';

dotenv.config();

const USER = process.env.USER;

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

export const register = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
	const data = req.body;
	const user = await ServicesUser.getUser(username);
	const url = req.file.path.slice(6);
	const subject = 'Nuevo Usuario Registrado';
	const mensaje = `<h1 style="color: blue;">Se Ha Registrado Un Nuevo Usuario ${data.name}, ${data.lastName}, ${data.address}, ${data.age}, ${data.phoneNumber}</h1>`;
	if (user) {
		return done('el usuario ya esta registrado', false);
	}
	const newUser = await ServicesUser.postUser(data, url, username, password);
	await Correo(USER, subject, mensaje);
	done(null, newUser);
});

export const login = new LocalStrategy(async (username, password, done) => {
	const user = await ServicesUser.getUser(username);
	if (!user) {
		return done('no existe el usuario', false);
	}
	if (!isValidPassword(user, password)) {
		return done('Contraseña incorrecta', false);
	}
	return done(null, user);
});

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
	const user = await dbUser.get(username);
	done(null, user);
});
