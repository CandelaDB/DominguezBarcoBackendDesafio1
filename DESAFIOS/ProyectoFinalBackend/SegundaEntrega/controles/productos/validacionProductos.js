import { prodContenedor } from "../../rutas/productos.js";

export function validId(req, res, next) {
    prodContenedor.getById(req.params.id) == null && req.params.id != null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "Este producto no existe" })
    : next();
}

export function existsProduct(req, res, next) {
    prodContenedor.getById(req.params.id) == null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "Este producto no existe" })
    : next();
}