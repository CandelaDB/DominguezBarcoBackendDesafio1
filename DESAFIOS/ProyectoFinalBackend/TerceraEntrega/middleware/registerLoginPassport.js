import container from "../containers/containerUsuario.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import bCrypt from "bcrypt";
import logger from '../logger.js';

dotenv.config();

const USER = process.env.USER;
const PASS = process.env.PASS;

const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: USER,
		pass: PASS,
	},
});
const dbUsuario = new container();

export const register = new LocalStrategy({passReqToCallback: true,}, async (req, username, password, done) => {
    const { name, address, age, phoneNumber } = req.body;
    const usuario = await dbUsuario.getUsuario(username);
    const mailOptions = {
		from: 'Servidor Node.js',
		to: USER,
		subject: 'Nuevo Usuario Registrado',
		html: `<h1 style="color: red;">Se Ha Registrado Un Nuevo Usuario ${name}, ${lastName}, ${address}, ${age}, ${phoneNumber}</h1>`,
	};
    if (usuario) {
        return done("El usuario ya esta registrado", false);
    }

    const newUser = {
        username,
        password: createHash(password),
        name,
        address,
        age,
        phoneNumber,
        avatar: req.file.path
    };

    await dbUsuario.addUsuario(newUser);
    try {const mensaje = await transporter.sendMail(mailOptions);
		logger.info(mensaje);
	} catch (err) {
		logger.error(err);
	}

    done(null, newUser);
});

export const login = new LocalStrategy(async (username, password, done) => {

    const usuario = await dbUsuario.getUsuario(username);

    if (!usuario) {
        return done("No existe el usuario", false);
    };

    if (!isValidPassword(usuario, password)) {
        return done("Contraseña incorrecta", false)
    };

    return done(null, usuario);
});

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const usuario = await dbUsuario.getUsuario(username);
    done(null, usuario);
});

function createHash(password) {
    return bCrypt.hashSync( password, bCrypt.genSaltSync(10), null );
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}