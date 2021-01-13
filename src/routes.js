const express = require('express')
const router = express.Router()
const multer = require('./app/middlewares/multer')

const ProductController = require('./app/controller/ProductController')


router.get('/', function (req, res) {
    return res.render('layout.njk')
})

router.get('/products/create', ProductController.create)
router.get('/products/:id/edit', ProductController.edit)
router.put('/products', multer.array("photo", 6),ProductController.put)
router.post('/products', multer.array("photo", 6),ProductController.post)
router.delete('/products', ProductController.delete)

//Alias
router.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})


module.exports = router