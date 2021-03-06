const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.set("view engine", "njk")
server.use(express.urlencoded({extended: true}))
server.use(methodOverride('_method'))
server.use(routes)
server.use(express.static('public'))

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.use( (req, res) => {
    res.status(404).render("client-side/not-found", {message: "Ops, acho que você foi pelo caminho errado!"});
});

server.listen(5500, ()=>{
    console.log('server is running')
})