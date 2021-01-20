const express = require('express')
const router = express.Router()

const HomeController = require('../app/controller/HomeController')

const users = require('./users')
const products = require('./products')

//HOME
router.get('/', HomeController.index)

router.use('/users', users)
router.use('/', products)


//Alias
router.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})

module.exports = router