const data = require('../data')


/* CLIENT SIDE */

exports.home = (req, res) => {
    return res.render('client-side/home', {items: data})
}

exports.about = (req, res) => {
    return res.render('client-side/about')
}

exports.recipes_page =  (req, res) => {
    return res.render('client-side/recipes', {items: data})
}

exports.each_recipe =  (req, res) => {
        const recipesList = [...data]
        const recipeIndex = req.params.index

        const currentRecipe = recipesList[recipeIndex - 1]
        
        if(!currentRecipe) {
            return res.render("client-side/not-found")
        }

        return res.render("client-side/current-recipe", {items: currentRecipe})
    }


/* SERVER SIDE */

exports.index = (req, res) => {
    return res.render('server-side/admin-recipes')
}

exports.create = (req, res) => {
    return res.render('server-side/create-recipe')
}