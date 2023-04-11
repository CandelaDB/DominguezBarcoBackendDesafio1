import Router from "koa-router";

import GraphqlController from '../controllers/productosGraphql.js'


const routerProductosGraphql = new Router({prefix: '/productosGraphql'})

routerProductosGraphql.get('/', new GraphqlController())


export { routerProductosGraphql }