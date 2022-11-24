const express = require('express')
const app = express()
const PORT = 8080

const handlebars = require('express-handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine())

app.set('view engine', 'handlebars')
app.set('views', './views')

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

app.get('/', (req, res) => {
    res.render('formulario', { title: 'Agregar un producto al stock' });
    });

app.post('/productos', (req, res) => {
    const dataProduct = req.body
    const id = stock.length + 1
    stock.push({ id, ...dataProduct})
    
    res.render('formulario', {title: 'Producto agregado'})
})

app.get('/productos', (req, res) => {
    const value = (stock.length >= 1 ? true : false)
    res.render('productos', { title: 'Listado de productos', list: stock, exists: value})
    })


app.listen(PORT, function(error){
    if(error){ console.error('SERVER ERROR') }
    console.log(`ACTIVE SERVER: http://localhost:${ PORT}`)
})