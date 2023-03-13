import { prodContenedor } from "../../rutas/productos.js";

export async function deleteProducts(req, res) {
    const id = await prodContenedor.deleteById(req.params.id);
    res.status(200).json({ status: "ok", deletedProduct: id });
}

export async function getProducts(req, res) {
    console.log(req.params.id);
    res
    .status(200)
    .json(
        !req.params.id
        ? await prodContenedor.getAll()
        : prodContenedor.getById(req.params.id)
    );
}

export async function postProducts(req, res) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const newProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
    };
    const idNew = await prodContenedor.save(newProduct);
    res.status(201).json({ status: "ok", newProductId: idNew });
}

export async function putProducts(req, res) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const updatedProduct = {
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    };
    const id = await prodContenedor.update(req.params.id, updatedProduct);
    res
        .status(200)
        .json({ status: "ok", updatedProduct: [prodContenedor.getById(id)] });
    }
    