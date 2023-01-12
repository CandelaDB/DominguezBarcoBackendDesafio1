import { Router }  from "express";
import { get, add, update, Delete } from "../controles/controles";

const productos = Router();

productos.get('/:id?', get);
productos.post('/', add);
productos.put('/:id', update);
productos.delete('/:id', Delete);

module.exports = productos;