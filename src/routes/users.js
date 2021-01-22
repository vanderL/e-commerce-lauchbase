const express = require('express')
const router = express.Router()

const SessionController = require('../app/controller/SessionController')
const UserController = require('../app/controller/UsersController')
/*
// login/logou
router.get('/login', SessionController.loginForm)
router.post('/login', SesSessionController.login)
router.post('/logout', SessionController.logout)

//reset password / forgot
router.get('/forgot-password', SessionController.forgotForm)
router.get('/password-reset', SessionController.resetForm)
router.post('/forgot-password', SessionController.forgot)
router.post('/reset-password', SessionController.reset)

//user register UserController */
router.get('/register', UserController.registerForm)
router.post('/register', UserController.post)

/*
router.get('/', UserController.show)
router.put('/', UserController.update)
router.delete('/', UserController.delete)
*/
module.exports = router