const express = require('express')
const router = express.Router()
const multer = require('../app/middlewares/multer')

const SearchController = require('../app/controller/SearchController')
const ProductController = require('../app/controller/ProductController')

//SEARCH
router.get('/search/products', SearchController.index)


router.get('/products/create', ProductController.create)
router.get('/products/:id', ProductController.show) // arrumar! 
router.get('/products/:id/edit', ProductController.edit)

router.post('/products', multer.array("photo", 6),ProductController.post)
router.put('/products', multer.array("photo", 6),ProductController.put)
router.delete('/products', ProductController.delete)

module.exports = router
