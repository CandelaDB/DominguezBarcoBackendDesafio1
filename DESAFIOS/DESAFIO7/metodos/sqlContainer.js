const knex = require('knex');

class ClienteSQL {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        this.knex.schema.hasTable('prodlist')
            .then(() => {
                return this.knex.schema.createTable('prodlist', table => {
                    table.increments('id').primary()
                    table.string('title', 20).notNullable()
                    table.float('price')
                    table.string('thumbnail', 30).notNullable()
                })
            .catch(() => {
                console.log("ya existe")
            })
        })
    }


    insertarArticulos(articulos) {
        return this.knex('prodlist').insert(articulos)
    }

    listarArticulos() {
        return this.knex('prodlist').select('*')
    }

    borrarArticulos(id) {
        return this.knex.from('prodlist').where('id', '=', id).del()
    }

    actualizarStock(obj, id) {
        return this.knex.from("prodlist").where('id', '=', id).update({obj})
    }

    crearChat() {
        this.knex.schema.hasTable('ecommerce')
            .then(() => {
                return this.knex.schema.createTable('ecommerce', table => {
                    table.increments('id').primary()
                    table.string('nombre', 15).notNullable()
                    table.string('codigo', 10).notNullable()
                    table.float('precio')
                    table.integer('stock')
                })
            .catch(() => {
                console.log("ya existe")
            })
        })
    }

    insertarChat(msj) {
        return this.knex('ecommerce').insert(msj)
    }

    listarChat() {
        return this.knex('ecommerce').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

export default ClienteSQL