import { cartContenedor } from "../../rutas/cart.js";
import { prodContenedor } from "../../rutas/productos.js";

export async function deleteCart(req, res) {
    const id = await cartContenedor.deleteById(req.params.id);
    res.status(200).json({ status: "Ok", deletedCart: id });
}

export async function deleteProductInCart(req, res) {
    const { id, id_prod } = req.params;
    const cart = cartContenedor.getById(id);

    const newCartProducts = cart.productos.filter((producto) => {
    return producto.id != id_prod;
    });

    cart.productos = newCartProducts;
    const updatedCartId = await cartContenedor.update(id, cart);
    res
    .status(201)
    .json({
        status: "Ok",
        updatedCart: updatedCartId,
        productDeletedId: id_prod,
    });
}

export async function getProductsInCart(req, res) {
    const cart = cartContenedor.getById(req.params.id);
    res.status(200).json(cart.productos);
}

export async function postCart(req, res) {
    const newCart = { timestamp: Date.now(), productos: [] };
    const idNew = await cartContenedor.save(newCart);
    res.status(201).json({ status: "Ok", newCartId: idNew });
}

export async function postProductInCart(req, res) {
    const cartId = req.params.id;
    const productId = req.body.id;

    const cart = cartContenedor.getById(cartId);
    const product = prodContenedor.getById(productId);

    cart.productos.push(product);
    console.log(cart);
    const updatedCartId = await cartContenedor.update(cartId, cart);
    res
    .status(201)
    .json({ status: "Ok", updatedCart: updatedCartId, productAdded: product });
}
