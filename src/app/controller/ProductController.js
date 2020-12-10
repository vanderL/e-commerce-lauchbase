const Category = require('../models/Category');
const Product = require('../models/Product');


module.exports = {
   async create(req, res) {
    try {
        const categories = await Category.all
        return res.render("products/create", { categories })

    } catch (error) {
        console.error(error)
    }
        
    },

   async post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
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