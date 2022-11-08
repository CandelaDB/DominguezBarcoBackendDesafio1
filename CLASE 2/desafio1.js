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
    addBook(nombreLibro, autorLibro){
        this.libros.push(
            {
                nombreLibro: nombreLibro,
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
usuario.addBook("Libro de Cande", "Cande");
usuario.getBookNames()


