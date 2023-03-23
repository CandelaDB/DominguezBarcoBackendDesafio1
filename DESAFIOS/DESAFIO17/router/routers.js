import { Router } from 'express';
import passport from 'passport';
import multer from 'multer';
import authentication from '../middleware/authentication.js';
import { register, login } from '../middleware/register-login.js';
import { getCart, postProductCart, deleteProductCart, deleteCart } from '../3Controlers/Cart.js';
import { getProduct, getProductName, postProduct, updateProduct, deleteProduct } from '../3Controlers/Products.js';
import { getSingIn, getSignUp, getLogout, getErrorLogin, getErrorRegister, getInicio } from '../3Controlers/User.js';
import postCompra from '../3Controlers/Compras.js';

const upload = multer({ dest: './public/img/uploads/' });

passport.use('register', register);
passport.use('login', login);

const inicio = Router();
const productos = Router();
const ingresar = Router();
const registrarse = Router();
const salir = Router();
const carrito = Router();
const compras = Router();

ingresar.get('/', getSingIn);
ingresar.post('/', passport.authenticate('login', { failureRedirect: '/ingresar/errorIngresar', successRedirect: '/inicio' }));
ingresar.get('/errorIngresar', getErrorLogin);

registrarse.get('/', getSignUp);
registrarse.post('/', upload.single('photo'), passport.authenticate('register', { failureRedirect: 'registrarse/errorRegistro', successRedirect: '/inicio' }));
registrarse.get('/errorRegistro', getErrorRegister);

salir.get('/', getLogout);

inicio.get('/', getInicio);

productos.get('/', getProduct);
productos.post('/busqueda', getProductName);
productos.post('/', authentication, postProduct);
productos.put('/:id', authentication, updateProduct);
productos.delete('/:id', authentication, deleteProduct);

carrito.get('/', authentication, getCart);
carrito.post('/', authentication, postProductCart);
carrito.post('/producto', authentication, deleteProductCart);
carrito.delete('/', authentication, deleteCart);

compras.post('/', authentication, postCompra);

export { inicio, productos, ingresar, registrarse, salir, carrito, compras };
