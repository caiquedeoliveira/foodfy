const Recipe = require('../../models/Recipe')
module.exports = {
    home(req, res) {
        Recipe.all(recipes => {
            return res.render('client-side/home', {recipes})
        })
    },
    
    about(req, res) {
        return res.render('client-side/about')
    },
    
    recipes_page(req, res) {
        Recipe.all(recipes => {
            return res.render('client-side/recipes', {recipes})
        })
    },
    
    each_recipe(req, res) {
        Recipe.find(req.params.id, recipe => {
            if(!recipe) return res.render("client-side/not-found")
    
            return res.render("client-side/current-recipe", {recipes})
        })
           
    }
    
}