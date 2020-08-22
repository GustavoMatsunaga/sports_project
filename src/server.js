const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const routes = require('./views/routes')
const { urlencoded } = require('express')
const methodOverride = require('method-override')

nunjucks.configure("src/views", {
    express:server, 
    noCache: true
})

server.use(express.urlencoded( {extended:true} ))
server.use(express.static("public"))
server.use(methodOverride('_method')) // Configuração para usar o método Post no HTML
server.use(routes)
server.listen(5000, 
    console.log("Server started at port 5000")
)
