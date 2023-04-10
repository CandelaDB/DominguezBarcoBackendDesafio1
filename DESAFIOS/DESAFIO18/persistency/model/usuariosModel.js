export default class usuariosYContrasenias {
    #id
    #username
    #password

    constructor( { _id, username, password } ) {
        this.id = _id,
        this.username = username,
        this.password = password
    }

    
    get id() { return this.#id }

    get username() { return this.#username }

    get password() { return this.#password }

    set id(id) { 
        this.#id = id
    }

    set username(username) { 
        this.#username = username
    }

    set password(password) { 
        this.#password = password
    }
}