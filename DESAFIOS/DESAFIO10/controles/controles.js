const container = require('../container/container');
const Producto = new container();

const getUsuario = (req, res) => {
    const usuario = req.session.nombre
    if (usuario === null || usuario === undefined) {
        res.render("ingresar")
    }
    else{
        res.redirect("/productos")
    }
}

const postUsurio = (req, res) => {
    const usuario = req.body.nombre
    req.session.nombre = usuario
    res.redirect("/productos")
}

const getSalir = (req, res) => {
    const usuario = req.session.nombre
    const saludo = `Hasta luego ${usuario}`
    req.session.destroy( err => {
        if (err){
            res.json({error: "Algo hiciste mal", descripcion: err})
        } else {
            res.render("saludo", {saludo}) 
        }
    })
}

const get = (req, res) => {
    const id = req.params.id
    if (id) {
        const usuario = req.session.nombre
        if (usuario === null || usuario === undefined) {
            return res.redirect("/ingresar")
        }
        Producto.get(id)
            .then(productos => {
                res.json(productos);
            })
            .catch(err => {
                res.json(err);
            })
    }
    else{
        const usuario = req.session.nombre
        if (usuario === null || usuario === undefined) {
            return res.redirect("/ingresar")
        }
        const saludo = `Bienvenido ${usuario}`
        Producto.get()
            .then(productos => {
                res.render('index', {productos, saludo});
            })
            .catch(err => {
                res.json(err);
            })
    }
}

const add = (req, res) => {
    const usuario = req.session.nombre
    if (usuario === null || usuario === undefined) {
        return res.redirect("/ingresar")
    }
    const newProducto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    }
    Producto.add(newProducto)
        .then(id => {
            res.json({ id: id }, res.redirect('/productos'));
        })
        .catch(err => {
            res.json(err);
        })
}

const update = (req, res) => {
    const usuario = req.session.nombre
    if (usuario === null || usuario === undefined) {
        return res.redirect("/ingresar")
    }
    const producto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    }
    Producto.update(req.params.id, producto)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

const Delete = (req, res) => {
    const usuario = req.session.nombre
    if (usuario === null || usuario === undefined) {
        return res.redirect("/ingresar")
    }
    Producto.delete( req.params.id)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

module.exports = {
    get,
    add,
    update,
    Delete,
    getUsuario,
    postUsurio,
    getSalir,
};