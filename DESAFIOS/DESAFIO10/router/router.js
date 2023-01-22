const { get, add, update, Delete, postUsurio, getUsuario, getSalir } = require('../controles/controles');

const { Router } = require('express');

const productos = Router();
const ingresar = Router();

ingresar.get('/', getUsuario)
ingresar.post('/', postUsurio)

productos.get('/salir', getSalir)
productos.get('/:id?', get);
productos.post('/', add);
productos.put('/:id', update);
productos.delete('/:id', Delete);

module.exports = {ingresar, productos};