const axios = require('axios')
const API_KEY = process.env.GOOGLE_MAPS_KEY
const User = require('../models/user')
const mapController = {
  getRestaurants: async (req, res) => {
    const { type, rating, distance, priceLevel, latitude, longitude } = req.body
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${type}餐廳&location=${latitude},${longitude}&radius=${distance}&opennow=true&minprice=0&maxprice=${priceLevel}&type=restaurant&key=${API_KEY}`
      )
      const results = response.data
      const userId = req.user._id

      if (results.status === 'OK') {
        // 篩選符合評價結果
        const rateFilter = results.results.filter(result => result.rating > rating)
        const user = await User.find({ _id: userId }).select('favoriteRestaurants')
        const favoriteRestaurantIds = user[0].favoriteRestaurants.map(restaurant => restaurant.restaurantId)

        const updateResults = rateFilter.map(result => {
          if (favoriteRestaurantIds.includes(result.place_id)) {
            result.isFavorite = true
          } else {
            result.isFavorite = false
          }
          return result
        })
        if (updateResults.length > 0) {
          res.json({ status: 'success', data: updateResults })
        } else {
          res.json({ status: 'success', data: [], message: '該條件無搜索結果' })
        }
      } else {
        res.json({ status: results.status, data: results.results })
      }
    } catch (error) {
      console.error('無法與API取得資料', error)
      res.status(500).json({ status: 'error', message: '無法與API取得資料' })
    }
  },
  getRestaurant: async (req, res) => {
    const { rid } = req.params
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?fields=photos,name,rating,user_ratings_total,price_level,business_status,formatted_address,opening_hours,website,formatted_phone_number,reviews,url&language=zh-TW&place_id=${rid}&key=${API_KEY}`
      )
      const result = response.data
      console.log('result', result)
      if (result.status === 'OK') {
        res.json({ status: 'success', data: result })
      } else {
        res.json({ status: result.status, data: result.results })
      }
    } catch (error) {
      console.error('無法取得地點詳細資料', error)
      res.status(500).json({ status: 'error', message: '無法取得地點詳細資料' })
    }
  }
}

module.exports = mapController