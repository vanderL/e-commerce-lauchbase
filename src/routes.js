const express = require('express')
const router = express.Router()


router.get('/', function (req, res) {
    return res.render('Olá, vou me torna o lanchstore')
})



module.exports = router