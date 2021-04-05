const express = require('express')
const router = express.Router()

const OrderController = require('../app/controller/OrderController')

const { onlyUsers } = require('../app/middlewares/session')

router.post('/', onlyUsers, OrderController.post)

module.exports = router