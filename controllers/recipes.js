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

    let { image_url, title, chef, ingredients, preparations, informations } = req.body

    let id = 1
    const lastRecipe = database.recipes[database.recipes.length - 1]

    if(lastRecipe){
        id = lastRecipe.id + 1
    }

    database.recipes.push({
        id,
        image_url,
        title,
        chef,
        ingredients,
        preparations,
        informations
    })

    fs.writeFile("data.json", JSON.stringify(database, null, 2), err => {

        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}

exports.show = (req, res) => {
    
    const {id} = req.params

    const foundRecipe = database.recipes.find(recipe => {
        return recipe.id == id
    })

    if(!foundRecipe) return res.send('Recipe not found!')

    const recipe = {
        ...foundRecipe
    }

    return res.render("server-side/current-recipe", {recipe})
}

exports.edit = (req, res) => {
    const {id} = req.params

    const foundRecipe = database.recipes.find(recipe => {
        return recipe.id == id
    })

    if(!foundRecipe) return res.send('Recipe not found!')

    const recipe = {
        ...foundRecipe
    }

    return res.render("server-side/edit", {recipe})
}

exports.put = (req, res) => {

    const {id} = req.body

    let index = 0
    const foundRecipe = database.recipes.find((recipe, foundIndex) => {
        if(recipe.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    database.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(database, null, 2), err => {
        if(err) return res.send("Write file error")

        return res.redirect(`/admin/recipes/${id}`)
    })

}

exports.delete = (req, res) => {
    const {id} = req.body

    const filteredRecipes = database.recipes.filter(recipe => {
        return recipe.id != id
    })

    database.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(database, null, 2), err => {
        if(err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}