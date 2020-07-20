const express = require('express')

const PORT = 8080

const app = express()

app.use(express.static('public/SPA'))

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, err => {
    if(err) return console.log(`Error en servidor ${err}`)
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})