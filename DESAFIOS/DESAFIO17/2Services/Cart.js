import Persistence from '../1Persistence/Persistence.js';
import Models from '../1Models/Cart.js';

async function getCart(Correo) {
	const result = await Persistence.getCorreo(Models, Correo);
	return result;
}

async function postCart(Usuario) {
	const Data = {
		author: {
			name: Usuario.name,
			lastName: Usuario.lastName,
			address: Usuario.address,
			phoneNumber: Usuario.phoneNumber,
			username: Usuario.username,
		},
		productos: [],
		timestamp: Date.now(),
	};
	const result = await Persistence.add(Models, Data);
	return result;
}

async function postProductCart(Correo, Data) {
	const result = await Persistence.updateCorreo(Models, Correo, { $push: { productos: Data } });
	return result;
}

async function deleteProductCart(Correo, Data) {
	const result = await Persistence.updateCorreo(Models, Correo, { $pull: { productos: Data } });
	return result;
}

async function deleteCart(Correo) {
	const result = await Persistence.deleteCorreo(Models, Correo);
	return result;
}

export default { getCart, postCart, postProductCart, deleteProductCart, deleteCart };
