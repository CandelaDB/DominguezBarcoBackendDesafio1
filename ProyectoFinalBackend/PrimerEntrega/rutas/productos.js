import express from "express";
import Contenedor from "../modelos/contenedor.js";
import { isAdmin } from "../controles/validacion.js";
import { getProducts, postProducts, putProducts, deleteProducts } from "../controles/productos/handlersProductos.js";

import { validId, existsProduct } from "../controles/productos/validacionProductos.js";

const { Router } = express;
const prodRouter = Router();

export const prodContenedor = new Contenedor("./data/productos.txt");

prodRouter.get("/:id?", validId, getProducts);

prodRouter.post("/", isAdmin , postProducts);

prodRouter.put("/:id", isAdmin, existsProduct, putProducts);

prodRouter.delete("/:id", isAdmin, existsProduct, deleteProducts);

export default prodRouter;