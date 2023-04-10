import mensajesDaoFactory from "../factory/mensajesFactory.js";

export default class mensajesRepo {
    dao

    constructor() {
        this.dao = mensajesDaoFactory.getDao()
    }

    static getInstance() {
        if(!instance) {
            instance =  new mensajesRepo()
        }
        return instance
    }

    async insertarMensaje(mensaje) {
        await this.dao.deleteMany({})
        await this.dao.create( [ mensaje ] )
    }

    async listarMensajes() {
        await this.dao.init()
        let res = await this.dao.listarMensajes()
        return ( res )
    }
}