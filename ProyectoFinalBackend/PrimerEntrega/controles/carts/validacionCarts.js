import { cartContenedor } from "../../rutas/cart.js";
import { prodContenedor } from "../../rutas/productos.js";

export function existsCart(req, res, next) {
    cartContenedor.getById(req.params.id)
    ? next()
    : res
        .status(401)
        .json({ error: -3, descripcion: "Este carrito no existe" });
}

export function existsProductForCartPost(req, res, next) {
    prodContenedor.getById(req.body.id) == null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "Este producto no existe" })
    : next();
}

export function existsProductInCart(req, res, next) {
    const cartProducts = cartContenedor.getById(req.params.id).productos;
    const prod = cartProducts.filter((prod) => prod.id == req.params.id_prod);
    prod.length == 0
    ? res
        .status(401)
        .json({ error: -3, descripcion: "Este producto no existe en el carrito" })
    : next();
}