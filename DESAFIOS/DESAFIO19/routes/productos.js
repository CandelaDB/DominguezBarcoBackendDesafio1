import { Router } from "express";

import productosControllers from '../controllers/productos.js';



const routerProductos = new Router()

const productos = new productosControllers()

routerProductos.get('/', productos.getProducts )

routerProductos.post('/', productos.postProduct )
routerProductos.put('/:id', productos.updateProduct )
routerProductos.delete('/:id', productos.deleteProduct )


export { routerProductos }