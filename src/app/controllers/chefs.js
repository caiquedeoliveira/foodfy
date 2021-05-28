const Chef = require('../../models/Recipe')

module.exports = {
    index(req, res){

        Chef.all(chefs => {
            return res.render('server-side/chefs/admin-chefs', {chefs})
        })
    },
    create(req, res){
        return res.render('server-side/chefs/create-chefs')

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
            if(!chef) return res.render('client-side/not-found')

            return res.render('server-side/chefs/current-chef', {chef})
        })

    },
    edit(req, res){
        Chef.find(req.params.id, chef => {
            if(!chef) return res.render('client-side/not-found')

            return res.render('server-side/chefs/chefs-edit')
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
        Chef.delete(req.body.id, ()=>{
            return res.redirect('/admin/chefs')
        })

    },
}