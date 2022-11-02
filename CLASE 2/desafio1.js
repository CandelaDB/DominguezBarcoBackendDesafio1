class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        console.log(`Hola mi nombre es ${this.nombre} y mi apellido ${this.apellido}.`);
    }

    addMascotas(nombreDeMascotas){
        this.mascotas.push(nombreDeMascotas);
    }
    countMascotas(){
        return (`Tienen ${this.mascotas.length} mascotas`);
    }
    addBook(){
        this.libros.push(
            {
                nombre: nombreLibro,
                autor: autorLibro,
            }
        );
    }
    getBookNames() {
        return (this.libros.map((libros) => libros.nombreLibro))
    }
}

let libros = [
    {
        nombreLibro: `Filosofia en 11 frases`,
        autorLibro: `Dario Z`,
    },
    {
        nombreLibro:`Cuentos de amor de locura y de muerte`,
        autorLibro:`Horacio Quiroga`,
    }
];

let usuario = new Usuario (
    `Candela`,`Dominguez Barco`, libros, []
);
// me tira error porque la estoy declarando y tratando de utilizar al mismo tiempo? Me dice que no se puede acceder a 'usuario' antes de la inicialización
// Como resuelvo ese error? 


/*let lista = new Usuario(`Candela`, `Dominguez Barco`, [
    {
        nombreLibro: `Filosofia en 11 frases`,
        autorLibro: `Dario Z`,
    },
    {
        nombreLibro:`Cuentos de amor de locura y de muerte`,
        autorLibro:`Horacio Quiroga`,
    }
],
["Mariano","Pepe","Karina"]);
*/
usuario.addMascotas(nombreDeMascotas = "Morcilla");
usuario.countMascotas();
usuario.addBook(nombreLibro, autorLibro);
usuario.getBookNames()


