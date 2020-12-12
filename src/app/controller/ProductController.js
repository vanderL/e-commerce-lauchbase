const Category = require('../models/Category');
const Product = require('../models/Product');


module.exports = {
    create(req, res) {
        Category.all()
        .then(function(results) {
           
            const categories = results.rows
            
            return res.render("products/create.njk", { categories })
        }).catch(function(err) {
            throw new Error(err)
        })        
    },

   async post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        let result = await Product.create(req.body)
        const productId = result.rows[0].id

        result = await Category.all()
        const categories = result.rows

        return res.render('products/create.njk', { productId, categories })
        
    }
}