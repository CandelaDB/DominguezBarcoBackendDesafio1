import express from "express";
import Contenedor from "../modelos/contenedor.js";
import {
    postCart,
    deleteCart,
    getProductsInCart,
    postProductInCart,
    deleteProductInCart,
} from "../controles/carts/handlersCarts.js";
import { existsCart, existsProductForCartPost, existsProductInCart } from "../controles/carts/validacionCarts.js";

const { Router } = express;
const cartRouter = Router();

export const cartContenedor = new Contenedor("./data/carts.txt");

cartRouter.delete("/:id?", existsCart, deleteCart);

cartRouter.post("/", postCart);

cartRouter.get("/:id/productos", existsCart, getProductsInCart);

cartRouter.post("/:id/productos", existsCart, existsProductForCartPost, postProductInCart);

cartRouter.delete("/:id/productos/:id_prod", existsCart, existsProductInCart, deleteProductInCart);

export default cartRouter;
