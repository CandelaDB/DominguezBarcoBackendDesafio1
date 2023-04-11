import Router from "koa-router";
import productosControllers from '../controllers/productos.js';



const routerProductos = new Router({prefix: '/productos'})

const productos = new productosControllers()

routerProductos.get('/', productos.getProducts )

routerProductos.post('/', productos.postProduct )
routerProductos.put('/:id', productos.updateProduct )
routerProductos.delete('/:id', productos.deleteProduct )


export { routerProductos }