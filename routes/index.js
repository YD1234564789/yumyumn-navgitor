const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map-controller')
const userController = require('../controllers/user-controller')

// router.post('/searchRestrurants', mapController.getTextSearchRestaurants)
router.get('/', (req, res) => res.render('index'))

module.exports = router