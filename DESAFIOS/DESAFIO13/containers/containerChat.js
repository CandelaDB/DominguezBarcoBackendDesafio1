import mongoose from "mongoose";
import modelsChat from "../models/modelsChat.js";
import dotenv from 'dotenv';

dotenv.config()
const dataBase = process.env.MONGOCONNECT
const urlPars = process.env.URLPARS
const unified = process.env.UNIFIED

mongoose.set('strictQuery', false);
mongoose.connect( dataBase, {
    useNewUrlParser: urlPars,
    useUnifiedTopology: unified,
}, (err) => {
    if (err) {
        console.log(err);
    }
});

export default class Container {

    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0});
        return data;
    };

    async addChat(data){
        const dataAdd = new modelsChat(data);
        const add = await dataAdd.save();
        return add;
    };

};