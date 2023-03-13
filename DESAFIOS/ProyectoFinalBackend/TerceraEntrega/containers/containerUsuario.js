import mongoose from "mongoose";
import modelsUsuario from "../models/modelsUsuario.js";
import dotenv from 'dotenv';
import logger from '../logger.js'

dotenv.config()
const dataBase = process.env.MONGOCONNECT
const urlPars = process.env.URLPARS
const unified = process.env.UNIFIED

try {
    await mongoose.connect(dataBase, {
        useNewUrlParser: urlPars,
        useUnifiedTopology: unified,
    });
    mongoose.set('strictQuery', false);
    console.log('Conectado a la base de datos');
} catch (error) {
    logger.error(`Error in Database connection: ${error}`);
}

export default class Container {

    async getUsuario(data){
        const usuario = await modelsUsuario.findOne({username: data});
        logger.info(`User ${usuario} is returned`);
        return usuario;
    };

    async addUsuario(data){
        const dataAdd = new modelsUsuario(data);
        const add = await dataAdd.save();
        logger.info(`added user`);
        return add;
    };
    
}