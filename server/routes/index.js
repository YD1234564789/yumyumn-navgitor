const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const { apiErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')
const restaurantController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')


//  餐廳相關
router.get('/restaurants/:rid', authenticated, restaurantController.getRestaurant)
router.post('/restaurants', authenticated, restaurantController.getRestaurants)
router.post('/favorite', authenticated, userController.addFavorite)
router.delete('/favorite/:rid', authenticated, userController.removeFavorite)
router.get('/favorites', authenticated, userController.getFavorites)
router.post('/comments/:rid', authenticated, userController.postComment)

// 登入相關
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/signup', userController.signup)
//google 登入
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}))
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect:'/', failureRedirect: 'login'}))

// 錯誤處理
router.use('/', apiErrorHandler)


module.exports = router