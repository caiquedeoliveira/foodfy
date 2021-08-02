const Recipe = require('../../models/Recipe')
const Chef = require('../../models/Chef')

module.exports = {
    async home(req, res) {
        let results = await Recipe.all()
        const recipes = results.rows
    
    
        if(!recipes) return res.render("client-side/not-found", {message: "Nenhuma receita foi encontrada."})
    
        async function getImage(recipeId){
            let results = await Recipe.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
    
            return files[0]
        }
        
        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        })
    
        const lastAdded = await Promise.all(recipesPromise)
    
        
        return res.render('client-side/home', {recipes: lastAdded})  
    },
    about(req, res) {
        return res.render('client-side/about')
    }, 
    async recipes_page(req, res) {

        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        let results = await Recipe.all()
        const recipes = results.rows
    
    
        if(!recipes) return res.render("client-side/not-found", {message: "Nenhuma receita foi encontrada."})
    
        async function getImage(recipeId){
            let results = await Recipe.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
    
            return files[0]
        }
        
        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        })
    
        const lastAdded = await Promise.all(recipesPromise)

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
                return res.render('client-side/recipes', {recipes: lastAdded, filter, pagination, filtermessage: `Buscando por "${filter}"`})
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

        results = await Recipe.files(recipes.id)
        let files = results.rows

        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("client-side/current-recipe", {recipes, files})
           
    }
    
}