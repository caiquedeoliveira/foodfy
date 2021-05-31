const Recipe = require('../../models/Recipe')

module.exports = {
index(req, res){

    Recipe.all(recipes => {
        return res.render('server-side/recipes/index', {recipes})
    })
  
},

create(req, res){

    Recipe.chefsSelectOptions(options => {
        return res.render('server-side/recipes/create', {chefOptions: options})
    })
    
},

post(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") return res.send('Please, fill all the fields!')
    }

   Recipe.create(req.body, recipe => {
       return res.redirect(`/admin/recipes/${recipe.id}`)
   })

},

show(req, res){
    
    Recipe.find(req.params.id, recipe => {
        if(!recipe) return res.render("client-side/not-found")

        return res.render("server-side/recipes/recipe", {recipe})
    })
},

edit(req, res){

    Recipe.find(req.params.id, recipe => {
        if(!recipe) return res.render("client-side/not-found")

        return res.render("server-side/recipes/edit", {recipe})
    })  
},

put(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") return res.send('Please, fill all the fields!')
    }

    Recipe.update(req.body, ()=>{
        return res.redirect(`/admin/recipes/${req.body.id}`)
    })

},
delete(req, res){
   Recipe.delete(req.body.id, ()=> {
       return res.redirect('/admin/recipes')
   })
}
}