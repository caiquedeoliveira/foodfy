const {date} = require('../lib/utils')
const db = require('../config/db')

module.exports = {
    all(){
        return db.query(`SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id`)
    },
    create(data){

        const query = `
            INSERT INTO chefs (
                name,
                created_at
            ) VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            data.name,
            date(Date.now()).iso,
        ]

        return db.query(query, values)
    },
    find(id){
        return db.query(`SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
                WHERE chefs.id = $1
                GROUP BY chefs.id`, [id])
    },
    findChefRecipes(id){
        return db.query(`
            SELECT recipes.*
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE recipes.chef_id = $1
            GROUP BY recipes.id
        `, [id])
    },
    update(data){
        const query = `
            UPDATE chefs SET
                name=($1),
                file_id=($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.file,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
    },
    files(id){
        return db.query(`
            SELECT * FROM chef_files WHERE chef_id = $1
        `, [id])
    }
}