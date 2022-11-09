
//Servidor sin express
/*const http = require('http')
const server = http.createServer((mensaje, respuesta) => {
    respuesta.end('Hola coder soy Candela')
});
const connection = server.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
});*/

/*const server = http.createServer((request, response) => {
    const mensaje = getMensajeSegunHora()
    response.end(mensaje)
});
function getMensajeSegunHora() {
    const hora = new Date().getHours()
    if (hora >= 6 && hora <= 12){
        return 'Buenos dias'
    }
    if (hora >= 13 && hora <= 19) {
        return 'Buenas tardes'
    }
    return 'Buenas noches'
};
const PORT = 8080
const conectedServer = server.listen(PORT, () => {
    console.log('Servidor escuchando en el 8080')
});*/
//Se esta creando servidor con express
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hola Soy Candela</h1>');
});
app.get('/2', (req, res) => {
    res.send('Como estas?') 
});

let visitas = 0
app.get('/visitas', (req, res) => {
    res.send('La cantidad de visistas es: ' + ++visitas) 
});

app.get('/fyh', (req, res) => {
    res.send({ fyh: new Date().toLocaleString() }) 
});

const server = app.listen(8080, () => {
    console.log('Servidor escuechando en el 8080')
});

server.on ('error', error => console.log ('Hubo un error: ' + error))

//get nuestro navegador solo hace get (traer informacion)
//post (publicar informacion)
//put (editar informacion la actualiza por completo)
//delete (eliminar informacion)
//patch (editar informacion por partes no todo)

