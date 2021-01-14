const { formatPrice } = require('../../lib/utils')

const Category = require('../models/Category');
const Product = require('../models/Product');
const File = require('../models/File');


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
    async post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        if (req.files.length == 0)
            return res.send('Please, send at least one image')

        
        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, product_id: productId}))
        await Promise.all(filesPromise)

        return res.redirect(`/products/${productId}/edit`)

    },
    async show(req, res) {
        return res.render("products/show")
    },
    async edit (req, res){
        let result = await Product.find(req.params.id)
        const product = result.rows[0]

        if(!product) return res.send("product not found!")
     
        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        //get categories
        result = await Category.all()
        const categories = result.rows

        //get images
        results = await Product.files(product.id)
        let files = results.rows 
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
        }))

        return res.render('products/edit.njk', { product, categories, files })
    },
    async put (req, res){
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill')
            }
        }

        if (req.files.length != 0) {
           const newFilesPromise = req.files.map(file =>
                File.create({...file, product_id: req.body.id})
            )
            
            await Promise.all(newFilesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromises = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromises)
        }


        req.body.price = req.body.price.replace(/\D/g, "")

        if(req.body.old_price != req.body.price) {
            const oldProduct = await Product.find(req.body.id)
            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        return res.redirect(`/products/${req.body.id}/edit`)
    },
    async delete(req, res) {
        await Product.delete(req.body.id)

        return res.redirect('/products/create')
    }
}