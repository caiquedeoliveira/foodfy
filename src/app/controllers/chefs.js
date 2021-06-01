const Chef = require('../../models/Chef')
const Recipe = require('../../models/Recipe')

module.exports = {
    index(req, res){

        Chef.all(chefs => {
            return res.render('server-side/chefs/index', {chefs})
        })
    },
    create(req, res){
        return res.render('server-side/chefs/create')

    },
    post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == "") return res.send('Fill all the fields')
        }

        Chef.create(req.body, chef => {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })

    },
    show(req, res){
        
        Chef.find(req.params.id, chef => {
            if(!chef) return res.render('client-side/not-found', {message: "Ops, chef não encontrado."})
            Chef.findChefRecipes(req.params.id, recipes => {
                return res.render('server-side/chefs/chef', {chef, recipes})
            })
            
            
        })

    },
    edit(req, res){
        Chef.find(req.params.id, chef => {
            if(!chef) return res.render('client-side/not-found', {message: "Ops, chef não encontrado."})

            return res.render('server-side/chefs/edit', {chef})
        })

    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "") return res.send("Fill all the fields")
        }

        Chef.update(req.body, ()=>{
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        Chef.find(req.body.id, chef => {
            if(chef.total_recipes >= 1){
                return res.render('client-side/not-found', {message: "Chefs com receitas cadastradas não podem excluir seus perfis :("})
            } else {
                Chef.delete(req.body.id, () => {
                    return res.redirect('/admin/chefs')
                })
            }
        })      
    },
}