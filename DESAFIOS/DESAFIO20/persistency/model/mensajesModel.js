export default class mensajesNormalizados {
    #entities
    #result

    constructor( {entities, result } ) {
        this.entities = entities
        this.result = result
    }
    
    get entities() { return this.#entities }

    get result() { return this.#result }

    set entities(entities) { 
        this.#entities = entities
    }

    set result(result) { 
        this.#result = result
    }
}