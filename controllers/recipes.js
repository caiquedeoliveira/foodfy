const fs = require('fs')
const database = require('../data.json')

/* CLIENT SIDE */

exports.home = (req, res) => {
    return res.render('client-side/home', {recipes: database.recipes})
}

exports.about = (req, res) => {
    return res.render('client-side/about')
}

exports.recipes_page =  (req, res) => {
    return res.render('client-side/recipes', {recipes: database.recipes})
}

exports.each_recipe =  (req, res) => {
        const recipesList = [...database.recipes]
        const recipeIndex = req.params.index

        const currentRecipe = recipesList[recipeIndex - 1]
        
        if(!currentRecipe) {
            return res.render("client-side/not-found")
        }

        return res.render("client-side/current-recipe", {recipes: currentRecipe})
    }


/* SERVER SIDE */

exports.index = (req, res) => {

    const recipes = database.recipes.map(recipe => {

        let allRecipes = {
            ...recipe
        }

        return allRecipes
    })

    return res.render('server-side/admin-recipes', {recipes})
}

exports.create = (req, res) => {
    return res.render('server-side/create-recipe')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") return res.send('Please, fill all the fields!')
    }

    database.recipes.push(req.body)

    fs.writeFile("data.json", JSON.stringify(database, null, 2), err => {

        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}

exports.show = (req, res) => {
    const recipesList = [...database.recipes]
    const recipeIndex = req.params.id

    const currentRecipe = recipesList[recipeIndex - 1]

    if(!currentRecipe){
        return res.render("client-side/not-found")
    }

    return res.render("server-side/current-recipe", {recipes: currentRecipe})
}

exports.edit = (req, res) => {
    const recipesList = [...database.recipes]
    const recipeIndex = req.params.id

    const currentRecipe = recipesList[recipeIndex - 1]

    if(!currentRecipe){
        return res.render("client-side/not-found")
    }

    return res.render("server-side/edit", {recipes: currentRecipe})
}