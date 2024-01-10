const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: (req, res) => {
    res.redirect('/map')
  },
  signupPage: (req, res) => {
    res.render('signup')
  },
  signup: (req, res) => {
    
  }
  
}

module.exports = userController