const express = require('express')
const router = express.Router()
const passport = require('passport')
const { authenticator } = require('../middleware/auth')
const restaurantController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')

router.post('/restaurants', restaurantController.getRestaurants)
// router.get('/restaurants/:rid', restaurantController.getRestaurant)



// 登入相關
router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)
router.get('/logout', userController.logout)
router.get('/', authenticator, (req, res) => res.render('index'))

module.exports = router