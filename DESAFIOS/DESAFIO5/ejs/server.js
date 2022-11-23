const express = require('express')

const app = express()

const productos = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

// get

app.get('/', (req, res) => {
    res.render('inicio', {productos})
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

app.listen(8080)