const Chef = require('../../models/Chef')

module.exports = {
    async index(req, res){
        let results = await Chef.all()
        const chefs = results.rows
        
        return res.render('server-side/chefs/index', {chefs})

    },
    create(req, res){
        return res.render('server-side/chefs/create')
    },
    async post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == "") return res.send('Fill all the fields')
        }

        let results = await Chef.create(req.body)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async show(req, res){
        
        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.render('client-side/not-found', {message: "Ops, chef não encontrado."})

        results = await Chef.findChefRecipes(req.params.id)
        const recipes = results.rows

        return res.render('server-side/chefs/chef', {chef, recipes})

    },
    async edit(req, res){

        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.render('client-side/not-found', {message: "Ops, chef não encontrado."})

        return res.render('server-side/chefs/edit', {chef})

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