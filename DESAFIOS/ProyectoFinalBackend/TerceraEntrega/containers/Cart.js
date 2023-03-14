import logger from '../logger.js';
import modelCart from '../models/Cart.js';
import connectMongo from '../connectMongo.js';

connectMongo();

export default class containerCart {
	async addCart(data) {
		try {
			const dataAdd = new modelCart(data);
			const cartAdd = await dataAdd.save();
			return cartAdd;
		} catch (err) {
			logger.error('Error al guardar el carrito ' + err);
		}
	}

	async getCart(correo) {
		try {
			const cart = await modelCart.findOne({ 'author.username': correo });
			return cart;
		} catch (err) {
			logger.error('Error al buscar el carrito ' + err);
		}
	}

	async updateCart(correo, data) {
		try {
			const producUpdate = await modelCart.updateOne({ 'author.username': correo }, data);
			return producUpdate;
		} catch (err) {
			logger.error('Error al buscar el carrito y actualizar ' + err);
		}
	}

	async deleteCart(correo) {
		try {
			const producDelete = await modelCart.deleteOne({ 'author.username': correo });
			return producDelete;
		} catch (error) {
			logger.error('Error al borrar el carrito ' + err);
		}
	}
}