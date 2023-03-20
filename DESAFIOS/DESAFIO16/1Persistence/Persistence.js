import logger from '../0Config/Logger.js';
import connectMongo from '../0Config/ConnectMongo.js';

connectMongo();

class Persistence {
	async add(models, data) {
		try {
			const dataAdd = new models(data);
			const add = await dataAdd.save();
			return add;
		} catch (err) {
			logger.error('Error al guardar ' + err);
		}
	}

	async get(models) {
		try {
			const result = await models.find({}, { _id: 0, __v: 0 });
			return result;
		} catch (err) {
			logger.error('Error al buscar ' + err);
		}
	}

	async getName(models, name) {
		try {
			const result = await models.find({ name: name }, { _id: 0, __v: 0 });
			return result;
		} catch (err) {
			logger.error('Error al buscar ' + err);
		}
	}

	async getUsername(models, username) {
		try {
			const result = await models.find({ username: username }, { _id: 0, __v: 0 });
			return result;
		} catch (err) {
			logger.error('Error al buscar ' + err);
		}
	}

	async getCorreo(models, correo) {
		try {
			const result = await models.findOne({ 'author.username': correo }, { _id: 0, __v: 0 });
			return result;
		} catch (err) {
			logger.error('Error al buscar ' + err);
		}
	}

	async getId(models, id) {
		try {
			const result = await models.findById(id);
			return result;
		} catch (err) {
			logger.error('Error al buscar ' + err);
		}
	}

	async updateId(models, id, data) {
		try {
			const update = await models.findByIdAndUpdate(id, data);
			return update;
		} catch (err) {
			logger.error('Error al actualizar ' + err);
		}
	}

	async updateCorreo(models, correo, data) {
		try {
			const update = await models.updateOne({ 'author.username': correo }, data);
			return update;
		} catch (err) {
			logger.error('Error al actualizar ' + err);
		}
	}

	async deleteId(models, id) {
		try {
			const deletee = await models.deleteOne({ _id: id });
			return deletee;
		} catch (err) {
			logger.error('Error al borrar ' + err);
		}
	}

	async deleteCorreo(models, correo) {
		try {
			const deletee = await models.deleteOne({ 'author.username': correo });
			return deletee;
		} catch (err) {
			logger.error('Error al borrar ' + err);
		}
	}
}

export default new Persistence();
