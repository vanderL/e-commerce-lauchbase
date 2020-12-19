const { formatPrice } = require('../../lib/utils')

const Category = require('../models/Category');
const Product = require('../models/Product');


module.exports = {
    async create(req, res) {
       await Category.all()
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

        return res.render(`products/${productId}/edit`, { productId, categories })
    },

    async edit (req, res){
        let result = await Product.find(req.params.id)
        const product = result.rows[0]

        if(!product) return res.send("product not found!")
     
        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        result = await Category.all()
        const categories = result.rows

        return res.render('products/edit', { product, categories })
    },
    async put (req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill')
            }
        }

        req.body.price = req.body.price.replace(/\D/g, "")

        if(req.body.old_price != req.body.price) {
            const oldProduct = await Product.find(req.body.id)
            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`/products/${req.body.id}/edit`)
    }
}