const Recipe = require('../../models/Recipe')
const RecipeFiles = require('../../models/RecipeFiles')

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

    if(req.files.length == 0) return res.render("client-side/not-found", {message: "Envie pelo menos 1 imagem em sua receita."})

    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id

    const filesPromise = req.files.map(file => RecipeFiles.create({...file}))
    const fileResults = await Promise.all(filesPromise)

    const recipeFiles = fileResults.map(file => {
        const fileId = file.rows[0].id
        RecipeFiles.createFileInsert(fileId, recipeId)
    })

    await Promise.all(recipeFiles)

    return res.redirect(`/admin/recipes/${recipeId}`)
   
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

    results = await Recipe.files(recipe.id)
    let files = results.rows

    files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render("server-side/recipes/edit", {recipe,  options, files})

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