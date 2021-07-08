const fs = require('fs')
const db = require('../config/db')

module.exports = {
    create({filename, path, chef_id}){
        const query = `
            INSERT INTO chef_files (
                name,
                path,
                chef_id
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            filename,
            path,
            chef_id
        ]

        return db.query(query, values)
    }
}