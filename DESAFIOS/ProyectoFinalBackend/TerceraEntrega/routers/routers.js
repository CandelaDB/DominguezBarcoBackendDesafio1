import { get, add, update, Delete, } from "../controlers/controlerProductos.js";
import { getSignIn, getSignUp, getLogout, getErrorLogin, getErrorRegister, getInicio } from "../controlers/controlerUsuario.js";
import passport from "passport";
import { register, login, } from "../middleware/registerLoginPassport.js";
import requireAuthentication from "../middleware/requireAuthentication.js"
import { Router } from "express";
import { deleteCarrito, getCarrito, postProductoCarrito, deleteProductoCarrito } from '../controlers/Cart.js';
import  postCompra  from '../controlers/Compras.js';
import multer from 'multer';
const upload = multer({ dest: './public/img/uploads/' })

const inicio = Router();
const productos = Router();
const ingresar = Router();
const registrarse = Router();
const salir = Router();
const carrito = Router();
const compras = Router();

passport.use("register", register);
passport.use("login", login);

ingresar.get("/", getSignIn);
ingresar.post("/", passport.authenticate("login", { 
    failureRedirect: "/ingresar/errorIngresar", 
    successRedirect: "/productos",
}));
ingresar.get("/errorIngresar", (req, res) => {
    res.render("login-error");
});

registrarse.get("/", getSignUp);
registrarse.post("/", upload.single('avatar'), passport.authenticate("register", {
    failureRedirect: "/registrarse/errorRegistro", 
    successRedirect: "/productos",
}));
registrarse.get("/errorRegistro", (req, res)=> {
    res.render("register-error");
});

salir.get("/", getLogout);

productos.get("/:id?", requireAuthentication, get);
productos.post("/", requireAuthentication, add);
productos.put("/:id", requireAuthentication, update);
productos.put('/:id', requireAuthentication, update);
productos.delete("/:id", requireAuthentication, Delete);

carrito.get('/', requireAuthentication, getCarrito);
carrito.post('/', requireAuthentication, postProductoCarrito);
carrito.post('/producto', requireAuthentication, deleteProductoCarrito);
carrito.delete('/', requireAuthentication, deleteCarrito);

compras.post('/', requireAuthentication, postCompra);

export {inicio, ingresar, productos, registrarse, salir , carrito, compras};