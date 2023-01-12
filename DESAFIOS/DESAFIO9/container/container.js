import mongoose from "mongoose";
import models from "../models/models";
import modelsChat from "../models/modelsChat"

const URL = 'mongodb://localhost:8080/ecommerce'
let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Base de datos conectada');
    }
});


class Container {

    async add(data){
        const dataAdd = new models(data)
        const add = await dataAdd.save()
        return add
    }

    async get(id){
        if (id) {
            const data = await models.findById(id)
            return data
        }
        else{
            const data = await models.find()
            return data
        }
    }

    async update(id, data){
        const update = await models.updateOne({_id: id}, data)
        return update
    }
    
    async delete(id){
        const deelete = await models.deleteOne({_id : id})
        return deelete
    }
    
    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0})
        return data
    }

    async addChat(data){
        const dataAdd = new modelsChat(data)
        const add = await dataAdd.save()
        return add
    }
}

module.exports = Container;