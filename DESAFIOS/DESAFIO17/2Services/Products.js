import Persistence from '../1Persistence/Persistence.js';
import Models from '../1Models/Produc.js';

async function getProduct() {
	const result = await Persistence.get(Models);
	return result;
}

async function getProductName(Name) {
	const result = await Persistence.getName(Models, Name);
	return result;
}

async function getProductId(Id) {
	const result = await Persistence.getId(Models, Id);
	return result;
}

async function postProduct(Producto) {
	const Data = {
		timestamp: Date.now(),
		name: Producto.name.toLowerCase().charAt(0).toUpperCase() + Producto.name.slice(1),
		description: Producto.description,
		code: Producto.code,
		price: Producto.price,
		photo: Producto.photo,
		stock: Producto.stock,
	};
	const result = await Persistence.add(Models, Data);
	return result;
}

async function updateProduct(Id, Producto) {
	const Data = {
		timestamp: Date.now(),
		name: Producto.name.toLowerCase().charAt(0).toUpperCase() + Producto.name.slice(1),
		description: Producto.description,
		code: Producto.code,
		price: Producto.price,
		photo: Producto.photo,
		stock: Producto.stock,
	};
	const result = await Persistence.updateId(Models, Id, Data);
	return result;
}

async function deleteProduct(Id) {
	const result = await Persistence.deleteId(Models, Id);
	return result;
}

export default { getProduct, getProductName, getProductId, postProduct, updateProduct, deleteProduct };
