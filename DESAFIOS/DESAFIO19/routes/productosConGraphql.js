import { Router } from "express";

import GraphqlController from '../controllers/productosGraphql.js'


const routerProductosGraphql = new Router()


routerProductosGraphql.use('/', new GraphqlController())


export { routerProductosGraphql }