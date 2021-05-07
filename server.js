const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.set("view engine", "njk")

server.use(express.static('public'))

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res)=>{
    const about = {
        description1: "As melhores receitas",
        description2: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro."
    }

    return res.render('home', {items: recipes, about: about})
})

server.get("/about", (req, res)=>{
    return res.render('about')
})

server.get("/recipes", (req, res)=>{
    return res.render('recipes', {items: recipes})
})

server.get("/recipes/:index", (req, res)=>{
    const recipesList = [...recipes]
    const recipeIndex = req.params.index

    const currentRecipe = recipesList[recipeIndex - 1]
    
    if(!currentRecipe) {
        return res.render("not-found")
    }

    return res.render("current-recipe", {items: currentRecipe})
})

server.use( (req, res) => {
    res.status(404).render("not-found");
});

server.listen(5500, ()=>{
    console.log('server is running')
})