import mongoose from "mongoose";
import modelsProductos from "../models/models.js";
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
    } else {
        console.log("MongoDB Connected");
    }
});

export default class Container {

    async add(data){
        const dataAdd = new modelsProductos(data);
        const add = await dataAdd.save();
        return add;
    };

    async get(id){
        if (id) {
            const data = await modelsProductos.findById(id);
            return data;
        }
        else{
            const data = await modelsProductos.find();
            return data;
        }
    };

    async update(id, data){
        const update = await modelsProductos.updateOne({_id: id}, data);
        return update;
    };
    
    async delete(id){
        const deelete = await modelsProductos.deleteOne({_id : id});
        return deelete;
    };

};