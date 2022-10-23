class usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        console.log(`Hola mi nombre es ${this.nombre} y mi apellido ${this.apellido}.`);
    }

    addMascotas(){
        this.mascotas.push(nombreDeMascotas);
    }
    countMascotas(){
        console.log(`Tienen ${this.mascotas.length} mascotas`);
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
        console.log (this.libros.map((libros) => this.libros.nombre))
    }
}
let libros =  [
    {
        nombreLibro: `Filosofia en 11 frases`,
        autorLibro: `Dario Z`,
    },
    {
        nombreLibro:`Cuentos de amor de locura y de muerte`,
        autorLibro:`Horacio Quiroga`,
    }
];

let usuario = new usuario (
    "Candela","Dominguez Barco", libros, []
)



usuario.addMascotas(nombreDeMascotas = "Morcilla");
usuario.countMascotas();



