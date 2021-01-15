const express = require('express')
const router = express.Router()
const multer = require('./app/middlewares/multer')

const ProductController = require('./app/controller/ProductController')
const HomeController = require('./app/controller/HomeController')
const SearchController = require('./app/controller/SearchController')

//HOME
router.get('/', HomeController.index)


//PRODUCT
router.get('/products/create', ProductController.create)
router.get('/products/:id', ProductController.show) // arrumar! 
router.get('/products/:id/edit', ProductController.edit)

router.post('/products', multer.array("photo", 6),ProductController.post)
router.put('/products', multer.array("photo", 6),ProductController.put)
router.delete('/products', ProductController.delete)

//SEARCH
router.get('/search/products', SearchController.index)

//Alias
router.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})




module.exports = router