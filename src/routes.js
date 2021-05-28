const express = require('express')
const routes = express.Router()
const client = require('./app/controllers/client-side')
const recipes = require('./app/controllers/recipes')


routes.get("/", (req, res)=>{
        return res.redirect('/home')
    })

    .get("/home", client.home)
    .get("/about", client.about)
    .get("/recipes", client.recipes_page)
    .get("/recipes/:index", client.each_recipe)

    .get("/admin/recipes", recipes.index)
    .get("/admin/recipes/create", recipes.create)
    .get("/admin/recipes/:id", recipes.show)
    .get("/admin/recipes/:id/edit", recipes.edit)

    .post("/admin/recipes", recipes.post)
    .put("/admin/recipes", recipes.put)
    .delete("/admin/recipes", recipes.delete)

module.exports = routes