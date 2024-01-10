const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map-controller')
const userController = require('../controllers/user-controller')

router.get('/login', userController.loginPage)
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)
router.get('/', (req, res) => res.render('index'))

module.exports = router