import mongoose from "mongoose";
import modelsChat from "../models/modelsChat.js";
import dotenv from 'dotenv';
import logger from '../logger.js';

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

    async getChat(){
        let data = await modelsChat.find({}, {_id:0, __v:0});
        
        
        if(data == undefined){
            return logger.error(`Chat data does not exist`)
        }

        logger.info(`Chat data recovered successfully`);
        return data;
    };

    async addChat(data){
        
        if( data.text == '' || data.author.email == '' || data.author.nombre == '' || data.author.apellido == '' || data.author.edad == '' || data.author.alias == '' || data.author.avatar == ''){
            return logger.error( `Data joined is void` )
        }

        const dataAdd = new modelsChat(data);
        const add = await dataAdd.save();
        logger.info(`Chat data attached successfully`);
        return add;
    };

};