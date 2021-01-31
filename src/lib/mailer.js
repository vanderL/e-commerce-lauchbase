const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "47c623bbdf355d",
      pass: "42af2735f1ef0a"
    }
  });