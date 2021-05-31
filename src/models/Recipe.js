const {date} = require('../lib/utils')
const db = require('../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM recipes`, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO recipes (
                image,
                title,
                chef_id,
                ingredients,
                preparations,
                informations,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.image,
            data.title,
            data.chef,
            data.ingredients,
            data.preparations,
            data.informations,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`SELECT recipes.*, chefs.name AS chef_name 
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
                WHERE recipes.id = $1`, [id], (err, results)=>{
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    }, 
    update(data, callback){
        const query = `
            UPDATE recipes SET
                image=($1),
                title=($2),
                chef_id=($3),
                ingredients=($4),
                preparations=($5),
                informations=($6)
            WHERE id = $7
        `

        const values = [
            data.image,
            data.title,
            data.chef,
            data.ingredients,
            data.preparations,
            data.informations,
            data.id
        ]
        
        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results)=>{
            if(err) throw `Database error! ${err}`

            return callback()
        })
    },
    chefsSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, (err, results)=>{
            if(err) throw `Database error! ${err}`
            
            callback(results.rows)
        })
    }
}