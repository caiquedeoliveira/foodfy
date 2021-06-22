const Recipe = require('../../models/Recipe')
const Chef = require('../../models/Chef')

module.exports = {
    async home(req, res) {

        let results = await Recipe.all()
        const recipes = results.rows
        
        return res.render('client-side/home', {recipes})  
    },
    about(req, res) {
        return res.render('client-side/about')
    }, 
    recipes_page(req, res) {

        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            page,
            offset,
            callback(recipes){
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit), 
                    page
                }
                return res.render('client-side/recipes', {recipes, filter, pagination, filtermessage: `Buscando por "${filter}"`})
            }
        }

        Recipe.paginate(params)   
    },
    async chefs(req, res){
        let results = await Chef.all()
        const chefs = results.rows
        return res.render('client-side/chefs', {chefs})
    },
    async each_recipe(req, res){

        let results = await Recipe.find(req.params.id)
        const recipes = results.rows[0]

        if(!recipes) return res.render("client-side/not-found", {message: "Ops, receita não encontrada."})

        return res.render("client-side/current-recipe", {recipes})
           
    }
    
}