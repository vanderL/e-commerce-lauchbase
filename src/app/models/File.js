const db = require('../config/db')

module.exports = {
    create(filename, path, products_id) {
        const query = `
            INSERT INTO files(
                name,
                path,
                products_id                
            ) VALUES($1, $2, $3)
            RETURNING id
        `
        const values = [
            filename,
            path,
            products_id,
        ]

        return db.query(query, values)
    }
}