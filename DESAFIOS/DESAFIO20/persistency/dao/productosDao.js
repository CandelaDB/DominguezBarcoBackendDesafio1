import mongoose from 'mongoose'
import { transformarADTO } from '../dto/productosDto.js'

const productosSchema = new mongoose.Schema({}, { strict: false })
class productosDao {
    constructor(connString){
        this.connString = connString
        this.productos = mongoose.model('productos', productosSchema)
        this.init()
    }

    static getInstance() {
        if(!instance) {
            instance =  new productosDao()
        }
        return instance
    }

    async init() {
        await mongoose.connect(this.connString, {useNewUrlParser: true, useUnifiedTopology: true})
    }

    async disconnect() {
        await mongoose.disconnect()
    }

    async getProducts () {
        let res = await this.productos.find()
        return transformarADTO( res )
    }

    async getOneProduct ( id ) {
        let res = await this.productos.find( {id: id} )
        return transformarADTO( res )
    }

    //nuevos productos
    async postProduct ( prod ) {
        return await this.productos.insertMany( [ prod ] )
    }
    //modificación de productos
    async updateProduct ( obj ) {
        return await this.productos.updateOne({_id: obj.id}, {$set : obj})
    }
    //borrar producto
    async deleteProduct ( id ) {
        let res = await this.productos.deleteOne( {_id: id} )
        return res
    }
}

export default productosDao