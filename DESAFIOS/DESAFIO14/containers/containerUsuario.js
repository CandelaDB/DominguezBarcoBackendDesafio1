import mongoose from "mongoose";
import modelsUsuario from "../models/modelsUsuario.js";
import dotenv from 'dotenv';

dotenv.config()
const dataBase = process.env.MONGOCONNECT
const urlPars = process.env.URLPARS
const unified = process.env.UNIFIED

mongoose.set('strictQuery', false);
mongoose.connect(dataBase, {
    useNewUrlParser: urlPars,
    useUnifiedTopology: unified,
}, (err) => {
    if (err) {
        console.log(err);
    }
});

export default class Container {

    async getUsuario(data){
        const usuario = await modelsUsuario.findOne({username: data});
        return usuario;
    };

    async addUsuario(data){
        const dataAdd = new modelsUsuario(data);
        const add = await dataAdd.save();
        return add;
    };
    
}