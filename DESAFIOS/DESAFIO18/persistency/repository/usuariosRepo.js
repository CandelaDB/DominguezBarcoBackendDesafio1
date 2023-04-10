import usuarioDaoFactory from "../factory/usuariosFactory.js";

export default class usuariosRepo {
    dao

    constructor() {
        this.dao = usuarioDaoFactory.getDao()
    }

    static getInstance() {
        if(!instance) {
            instance =  new usuariosRepo()
        }
        return instance
    }

    async insertarUsuario(user) {
        await this.dao.insertarUsuario( user )
    }

    async listarTodosLosUsuarios() {
        await this.dao.init()
        let res = await this.dao.listarTodosLosUsuarios()
        return ( res )
    }
}