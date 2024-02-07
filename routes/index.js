const express = require('express')
const router = express.Router()
const passport = require('passport')
const { authenticator } = require('../middleware/auth')
const restaurantController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')

//  餐廳相關
router.get('/restaurants/:rid', authenticator, restaurantController.getRestaurant)
router.post('/restaurants', authenticator, restaurantController.getRestaurants)
router.post('/favorite', authenticator, userController.addFavorite)
router.delete('/favorite/:rid', authenticator, userController.removeFavorite)
router.post('/comments/:rid', authenticator, userController.postComment)

// 登入相關
router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)
router.get('/logout', userController.logout)
//google 登入
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}))
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect:'/', failureRedirect: 'login'}))

router.get('/', authenticator, (req, res) => res.render('index'))

module.exports = router