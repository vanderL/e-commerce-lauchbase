const express = require('express')
const router = express.Router()

const HomeController = require('../app/controller/HomeController')

const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')

//HOME
router.get('/', HomeController.index)

router.use('/users', users)
router.use('/', products)
router.use('/cart', cart)
router.use('/orders', orders)

//Alias
router.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})

router.get('/accounts', function(req, res) {
    return res.redirect("/users/login")
})

module.exports = router