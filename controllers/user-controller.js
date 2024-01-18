const User = require('../models/user')
const bcrypt = require('bcryptjs')
const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: (req, res) => {
    res.redirect('/index')
  },
  signupPage: (req, res) => {
    res.render('signup')
  },
  signup: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    User.findOne({ email })
      .then(user => {
        if (user) {
          console.log('User already exists.')
          res.render('signup', {
            name,
            email,
            password,
            passwordCheck
          })
        } else {
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/login')
  } 
}

module.exports = userController