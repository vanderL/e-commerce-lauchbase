const express = require('express')
const router = express.Router()
const multer = require('../app/middlewares/multer')

const SearchController = require('../app/controller/SearchController')
const ProductController = require('../app/controller/ProductController')

const { onlyUsers } = require('../app/middlewares/session')

const Validator = require('../app/validators/products')
//SEARCH
router.get('/search/products', SearchController.index)


router.get('/products/create', onlyUsers, ProductController.create)
router.get('/products/:id', ProductController.show)
router.get('/products/:id/edit', onlyUsers, ProductController.edit)

router.post('/products', onlyUsers, multer.array("photo", 6), Validator.post, ProductController.post)
router.put('/products', onlyUsers, multer.array("photo", 6), Validator.put, ProductController.put)
router.delete('/products', onlyUsers, ProductController.delete)

module.exports = router
