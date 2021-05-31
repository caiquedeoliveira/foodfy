const express = require('express')
const routes = express.Router()
const client = require('./app/controllers/client-side')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

routes.get("/", (req, res)=>{
        return res.redirect('/home')
    })

    .get("/home", client.home)
    .get("/about", client.about)
    .get("/recipes", client.recipes_page)
    .get("/chefs", client.chefs)
    .get("/recipes/:id", client.each_recipe)

    .get("/admin", (req, res)=>{
        return res.render("server-side/admin")
    })

    .get("/admin/recipes", recipes.index)
    .get("/admin/recipes/create", recipes.create)
    .get("/admin/recipes/:id", recipes.show)
    .get("/admin/recipes/:id/edit", recipes.edit)

    .post("/admin/recipes", recipes.post)
    .put("/admin/recipes", recipes.put)
    .delete("/admin/recipes", recipes.delete)

    .get("/admin/chefs", chefs.index)
    .get("/admin/chefs/create", chefs.create)
    .get("/admin/chefs/:id", chefs.show)
    .get("/admin/chefs/:id/edit", chefs.edit)

    .post("/admin/chefs", chefs.post)
    .put("/admin/chefs", chefs.put)
    .delete("/admin/chefs", chefs.delete)

module.exports = routes