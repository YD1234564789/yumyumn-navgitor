const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const { authenticator } = require('../middleware/auth')
const restaurantController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')


router.get('/api', userController.hello)
//  餐廳相關
router.get('/restaurants/:rid', authenticator, restaurantController.getRestaurant)
router.post('/restaurants', authenticator, restaurantController.getRestaurants)
router.post('/favorite', authenticator, userController.addFavorite)
router.delete('/favorite/:rid', authenticator, userController.removeFavorite)
router.post('/comments/:rid', authenticator, userController.postComment)

// 登入相關
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/signup', userController.signup)
//google 登入
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}))
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect:'/', failureRedirect: 'login'}))

router.get('/', authenticator, (req, res) => res.render('index'))

module.exports = router