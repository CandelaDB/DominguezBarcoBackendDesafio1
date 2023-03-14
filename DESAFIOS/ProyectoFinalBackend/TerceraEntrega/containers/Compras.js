import logger from '../logger.js';
import modelCompras from '../models/Compras.js';
import connectMongo from '../connectMongo.js';

connectMongo();

export default class containerCompras {
	async addCompras(data) {
		try {
			const dataAdd = new modelCompras(data);
			const comprasAdd = await dataAdd.save();
			return comprasAdd;
		} catch (err) {
			logger.error('Error al propcesar su compra ' + err);
		}
	}
}