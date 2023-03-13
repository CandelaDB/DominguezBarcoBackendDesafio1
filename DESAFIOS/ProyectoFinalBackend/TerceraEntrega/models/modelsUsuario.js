import mongoose from "mongoose";

const collectionUsuario = "Usuario";

const schemaUsuario = new mongoose.Schema({
    name: String,
    address: String,
    age: String,
    phoneNumber: String,
    avatar: String,
    username: String,
    password: String
});

const modelsUsuario = mongoose.model(collectionUsuario, schemaUsuario);

export default modelsUsuario;