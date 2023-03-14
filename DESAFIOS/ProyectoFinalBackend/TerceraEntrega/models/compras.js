import mongoose from 'mongoose';

const collectionCompras = 'compras';

const schemaCompras = new mongoose.Schema({
	compra: Object
});

const modelCompras = mongoose.model(collectionCompras, schemaCompras);

export default modelCompras;