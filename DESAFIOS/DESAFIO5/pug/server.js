const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'pug')

let stock = [
    {
        id: 1,
        title: "Cafe negro",
        price: 400,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/coffee-store/64/coffee-05-256.png"
    },
        {
        id: 2,
        title: "Capuchino",
        price: 550,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/coffee-store/64/coffee-08-256.png"
    },
        {
        id: 3,
        title: "Milkshake",
        price: 620,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/coffee-store/64/coffee-01-256.png"
},
        {
        id: 4,
        title: "Granos de cafe",
        price: 900,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/coffee-store/64/coffee-06-256.png"
    }]

app.get('/', (req, res) =>{
    res.render('formulario.pug', {title: 'Agregar un producto al stock'})
})

app.get('/productos', (req, res) =>{
    const value = (stock.length >= 1 ? true : false)
    res.render('productos.pug', {title: 'Listado de productos', list: stock, exist: value})
})

app.post('/productos', (req, res) =>{
    const productData = req.body
    const id = stock.length + 1
    stock.push({id, ...productData})
    res.render('formulario.pug', {title: 'Producto agregado'})
})

app.listen(PORT, function(err){
    if(err) {console.error('SERVER ERROR')}
    console.log(`ACTIVE SERVER: http://localhost:${ PORT}`)
})