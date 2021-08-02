const Chef = require('../../models/Chef')
const ChefFiles = require('../../models/ChefFiles')
const Recipe = require('../../models/Recipe')

module.exports = {
    async index(req, res){
        let results = await Chef.all()
        const chefs = results.rows
    
    
        if(!chefs) return res.render("client-side/not-found", {message: "Nenhum chef foi encontrado."})
    
        async function getImage(chefId){
            let results = await Chef.files(chefId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
    
            return files[0]
        }
        
        const chefsPromise = chefs.map(async chef => {
            chef.img = await getImage(chef.id)
            return chef
        })
    
        const lastAdded = await Promise.all(chefsPromise)
    
        return res.render('server-side/chefs/index', {chefs: lastAdded})
        
    },
    create(req, res){
        return res.render('server-side/chefs/create')
    },
    async post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == "") return res.send('Fill all the fields')
        }

        if(req.files.length == 0) return res.render("client-side/not-found", {message: "Envie pelo menos 1 imagem de avatar."})

        let results = await Chef.create(req.body)
        const chefId = results.rows[0].id

        const filePromise = req.files.map( file => ChefFiles.create({...file, chef_id: chefId }))
        await Promise.all(filePromise)

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async show(req, res){
        
        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.render('client-side/not-found', {message: "Ops, chef não encontrado."})

        results = await Chef.files(chef.id)
        let files = results.rows
    
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        results = await Chef.findChefRecipes(req.params.id)
        const recipes = results.rows

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

        return res.render('server-side/chefs/chef', {chef, recipes: lastAdded, files})

    },
    async edit(req, res){

        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.render('client-side/not-found', {message: "Ops, chef não encontrado."})

        results = await Chef.files(chef.id)
        let files = results.rows

        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('server-side/chefs/edit', {chef, files})

    },
    async put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "") return res.send("Fill all the fields")
        }

        await Chef.update(req.body)
        
         return res.redirect(`/admin/chefs/${req.body.id}`)
    },
    async delete(req, res){
        let results = await Chef.find(req.body.id)
        const chef = results.rows[0]

        if(chef.total_recipes >= 1){
            return res.render('client-side/not-found', {message: "Chefs com receitas cadastradas não podem excluir seus perfis :("})
        } else {
            await Chef.delete(req.body.id)

            return res.redirect('/admin/recipes')
        }   
    },
}