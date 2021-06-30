const {date} = require('../lib/utils')
const db = require('../config/db')

module.exports = {
    all(){
        return db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        GROUP BY recipes.id, chefs.name`)
    },
    create(data){
        const query = `
            INSERT INTO recipes (
                title,
                chef_id,
                ingredients,
                preparations,
                informations,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.title,
            data.chef,
            data.ingredients,
            data.preparations,
            data.informations,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id){
        return db.query(`SELECT recipes.*, chefs.name AS chef_name 
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
                WHERE recipes.id = $1`, [id])
    }, 
    update(data){
        const query = `
            UPDATE recipes SET
                title=($1),
                chef_id=($2),
                ingredients=($3),
                preparations=($4),
                informations=($5)
            WHERE id = $6
        `

        const values = [
            data.title,
            data.chef,
            data.ingredients,
            data.preparations,
            data.informations,
            data.id
        ]
        
       return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },
    chefsSelectOptions(){
        return db.query(`SELECT name, id FROM chefs`)
    },
    paginate(params){
        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`

        if(filter){
            filterQuery = `
                WHERE recipes.title ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            GROUP BY recipes.id, chefs.name LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    files(id){
        return db.query(`
            SELECT files.*, recipe_id, file_id
            FROM files
            LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
            WHERE recipe_files.recipe_id = $1
        `, [id])
    }
}