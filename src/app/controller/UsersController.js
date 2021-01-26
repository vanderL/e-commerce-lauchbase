const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render('user/register')
    },
    show(re, res){
        return res.send('Ok, você chegou aqui!')
    },
    async post(req, res) {
        
        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.redirect('/users')

    }
}