const express = require('express')
const router = express.Router()

const SessionController = require('../app/controller/SessionController')
const UserController = require('../app/controller/UsersController')

const SessionValidator = require('../app/validators/session')
const UserValidator = require('../app/validators/user')

const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session')
// login/logou
router.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
router.post('/login',SessionValidator.login, SessionController.login)
router.post('/logout', SessionController.logout)

//reset password / forgot
router.get('/forgot-password', SessionController.forgotForm)
//router.get('/password-reset', SessionController.resetForm)
router.post('/forgot-password',SessionValidator.forgot, SessionController.forgot)
//router.post('/reset-password', SessionController.reset)

//user register UserController */
router.get('/register', UserController.registerForm)
router.post('/register',UserValidator.post, UserController.post)


router.get('/', onlyUsers, UserValidator.show, UserController.show)
router.put('/',UserValidator.update, UserController.update)
/*router.delete('/', UserController.delete)
*/
module.exports = router