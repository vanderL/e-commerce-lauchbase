const crypto =  require('crypto')
const { hash } = require('bcryptjs')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

module.exports = {
    loginForm(req, res) {
        return res.render('session/index')
    },
    login(req, res){
        req.session.userId = req.user.id

        return res.redirect('/users')        
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    },
    forgotForm(req, res) {
        return res.render('session/forgot-password')
    },
    async forgot(req, res) {
        const user = req.user

        try {
          // um token para esse usuário 
          const token = crypto.randomBytes(20).toString("hex")
        
          // criar uma expiração do token
          let now = new Date()
          now = now.setHours(now.getHours() + 1)
  
          await User.update(user.id, {
              reset_token: token,
              reset_token_expires: now
          })
          // enviar um email com um link de recuperação
          await mailer.sendMail({
              to: user.email,
              from: 'no-reply@launchstore.com.br',
              subject: 'Recuperação de password',
              html: ` <h2> Perdeu a chave? </h2>
              <p> Não se preocupe, clique no link a baixo para recuperar sua senha </p>
              <p>
                  <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                      Recuperar senha
                  </a>
              </p>
              `
          })
          //avisar o usuário que enviamos o link
          return res.render('session/forgot-password', {
              success: "Verifique seu email"
          })    
        } catch (error) {
            console.error(error)
            return res.render('session/forgot-password', {
                error: "Erro não esperado"
            })
        }
    },
    resetForm(req, res) {
        const token = req.query.token
        console.log(token)
        return res.render('session/reset-password', { token: req.query.token })
    },
    async reset(req, res) {
        const { user } = req
        const { password, token } = req.body
        
        try {
            //novo hash de senha 
            const newPassword = await hash(password, 8)
            // atualiza o usuário
            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })
            //avisa o usuário o sucesso da operação
            return res.render("user/login", {
                user: req.body,
                success: "Senha atualizada!! Faça o login"
            })

        } catch (err) {
            console.error(err)
            return res.render('users/reset-password', {
                user: req.body,
                token,
                error: "Erro inesperado, tente novamente!"
            })
        }
    }
}