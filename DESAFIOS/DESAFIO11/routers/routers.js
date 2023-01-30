import container from "../containers/containerUsuario.js";
import { get, add, update, Delete, } from "../controlers/controlerProductos.js";
import { getSignIn, getSignUp, getLogout, } from "../controlers/controlerUsuario.js";
import { Router } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";

const dbUsuario = new container();
const productos = Router();
const ingresar = Router();
const registrarse = Router();
const salir = Router();

function createHash(password) {
    return bCrypt.hashSync( password, bCrypt.genSaltSync(10), null );
}
passport.use("register", new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {

    const { name } = req.body;
    const usuario = await dbUsuario.getUsuario(username);

    if (usuario) {
        return done("El usuario ya esta registrado", false);
    }

    const newUser = {
        username,
        password: createHash(password),
        name,
    };

    dbUsuario.addUsuario(newUser);

    done(null, newUser);
}));

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

passport.use("login", new LocalStrategy(async (username, password, done) => {

    const usuario = await dbUsuario.getUsuario(username);

    if (!usuario) {
        return done("No existe el usuario", false);
    };

    if (!isValidPassword(usuario, password)) {
        return done("Contraseña incorrecta", false)
    };

    return done(null, usuario);
}));   

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const usuario = await dbUsuario.getUsuario(username);
    done(null, usuario);
});

ingresar.get("/", getSignIn);
ingresar.post("/", passport.authenticate("login", { 
    failureRedirect: "/ingresar/errorIngresar", 
    successRedirect: "/productos",
}));
ingresar.get("/errorIngresar", (req, res) => {
    res.render("login-error");
});

registrarse.get("/", getSignUp);
registrarse.post("/", passport.authenticate("register", {
    failureRedirect: "/registrarse/errorRegistro", 
    successRedirect: "/productos",
}));
registrarse.get("/errorRegistro", (req, res)=> {
    res.render("register-error");
});

salir.get("/", getLogout);

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/ingresar');
    };
};

productos.get("/:id?", requireAuthentication, get);
productos.post("/", requireAuthentication, add);
productos.put("/:id", requireAuthentication, update);
productos.delete("/:id", requireAuthentication, Delete);

export {ingresar, productos, registrarse, salir};