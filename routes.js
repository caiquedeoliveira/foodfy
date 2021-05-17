const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes')


routes.get("/", (req, res)=>{
        return res.redirect('/home')
    })

    .get("/home", recipes.home)
    .get("/about", recipes.about)
    .get("/recipes", recipes.recipes_page)
    .get("/recipes/:index", recipes.each_recipe)

    .get("/admin/recipes", recipes.index)
    .get("/admin/recipes/create", recipes.create)
    .get("/admin/recipes/:id", recipes.show)
    .get("/admin/recipes/:id/edit", recipes.edit)

    .post("/admin/recipes", recipes.post)


module.exports = routes