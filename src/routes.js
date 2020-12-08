const express = require('express')
const router = express.Router()
const ProductController = require('./app/controller/ProductController')


router.get('/', function (req, res) {
    return res.render('layout.njk')
})

router.get('/products/create', ProductController.create)

router.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})


module.exports = router