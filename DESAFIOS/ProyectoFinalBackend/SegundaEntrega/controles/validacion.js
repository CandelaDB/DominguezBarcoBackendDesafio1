import { admin } from "../server.js";

export function isAdmin(req, res, next) {
    admin
    ? next()
    : res
        .status(401)
        .json({
            error: -4,
            descripcion: "La ruta no esta autorizada",
            route: req.originalUrl,
        });
}