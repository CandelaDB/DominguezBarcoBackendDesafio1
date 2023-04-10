import { Router } from "express";

import {getProducts, postProduct, updateProduct, deleteProduct} from '../controllers/productos.js';


const routerProductos = new Router()

routerProductos.get('/', getProducts )

routerProductos.post('/', postProduct )

routerProductos.put('/:id', updateProduct )

routerProductos.delete('/:id', deleteProduct )


export { routerProductos }