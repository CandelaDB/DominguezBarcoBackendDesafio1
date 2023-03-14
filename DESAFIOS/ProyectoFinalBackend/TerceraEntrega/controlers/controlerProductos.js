import ContainerProductos from "../containers/containerProductos.js";
import logger from '../logger.js';

const Producto = new ContainerProductos();

export const get = (req, res) => {
    const id = req.params.id;
    if (id) {
        Producto.get(id)
            .then(productos => {
                res.json(productos);
            })
            .catch(err => {
                logger.error(`searched product doesn't exist`)
                res.json(err);
            });
    }
    else{
        const usuario = req.user.username
        const saludo = `Bienvenido ${usuario}`
        Producto.get()
            .then(productos => {
                res.render("index", {productos, saludo});
            })
            .catch(err => {
                res.json(err);
            });
    };
};

export const add = (req, res) => {
    const newProducto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    };
    Producto.add(newProducto)
        .then(id => {
            res.json({ id: id }, res.redirect("/productos"));
        })
        .catch(err => {
            logger.error(`add product fail`);
            res.json(err);
        });
};

export const update = (req, res) => {
    const producto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    };
    Producto.update(req.params.id, producto)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            logger.error(`update product fail`);
            res.json(err);
        });
};

export const Delete = (req, res) => {
    Producto.delete( req.params.id)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            logger.error(`delete product fail`);
            res.json(err);
        });
};