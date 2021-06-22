const Recipe = require('../../models/Recipe')

module.exports = {
async index(req, res){

    let results = await Recipe.all()
    const recipes = results.rows

    return res.render('server-side/recipes/index', {recipes})
},
async create(req, res){

    let results = await Recipe.chefsSelectOptions()
    let options = results.rows
   
    return res.render('server-side/recipes/create', {options})
  
},
async post(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") return res.send('Please, fill all the fields!')
    }

    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id

    results = await Recipe.chefsSelectOptions()
    let options = results.rows

    return res.redirect(`/admin/recipes/${recipeId}`, {options})
   
},
async show(req, res){
    
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.render("client-side/not-found", {message: "Ops, receita não encontrada."})

    return res.render("server-side/recipes/recipe", {recipe})
   
},
async edit(req, res){

    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.render("client-side/not-found", {message: "Ops, receita não encontrada."})

    results = await Recipe.chefsSelectOptions()
    const options = results.rows

    return res.render("server-side/recipes/edit", {recipe,  options})

},
async put(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") return res.send('Please, fill all the fields!')
    }

    await Recipe.update(req.body)

    return res.redirect(`/admin/recipes/${req.body.id}`)

},
async delete(req, res){

    await Recipe.delete(req.body.id)

    return res.redirect('/admin/recipes')
}
}