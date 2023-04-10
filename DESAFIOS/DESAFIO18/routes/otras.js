import { Router } from "express";
import { info, randoms, otras } from '../controllers/otras.js'

const routerOtras = new Router()

routerOtras.get('/info', info )

routerOtras.get('/api/randoms', randoms )

export { routerOtras }