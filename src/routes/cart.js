const express = require('express')
const router = express.Router()

const CartController = require('../app/controller/CartController')

router.get('/', CartController.index)
router.post('/:id/add-one', CartController.addOne)
router.post('/:id/remove-one', CartController.removeOne)


module.exports = router