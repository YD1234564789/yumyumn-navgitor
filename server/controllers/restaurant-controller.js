const axios = require('axios')
const API_KEY = process.env.GOOGLE_MAPS_KEY
const User = require('../models/user')
const mapController = {
  getRestaurants: async (req, res, next) => {
    const { type, rating, distance, priceLevel, latitude, longitude } = req.body
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=zh-TW&region=TW&keyword=${type}餐廳&location=${latitude},${longitude}&radius=${distance}&minprice=0&maxprice=${priceLevel}&type=restaurant&key=${API_KEY}`
      )
      const results = response.data
      const userId = req.user._id
      if (results.status === 'ZERO_RESULTS') {
        res.json({ message: '無搜索結果'})
      }
      if (results.status === 'OK') {
        // 篩選符合評價結果
        const rateFilter = results.results.filter(result => result.rating > rating)
        // 撈用戶ID跟餐廳ID
        const user = await User.find({ _id: userId }).select('favoriteRestaurants')
        const favoriteRestaurantIds = user[0].favoriteRestaurants.map(restaurant => restaurant.restaurantId)
        
        const updateResults = rateFilter.map(result => {
          if (favoriteRestaurantIds.includes(result.place_id)) {
            result.isFavorite = true
          } else {
            result.isFavorite = false
          }
          const openNow = result.opening_hours.open_now? "營業中" : "已打烊"
          return {...result, openNow}
        })

        if (updateResults.length > 0) {
          res.json({ status: 'success', data: updateResults, message: '取得搜索結果！' })
        } else {
          res.json({ status: 'success', data: [], message: '該條件無搜索結果' })
        }
      } else {
        res.json({ status: results.status, data: results.results})
      }
    } catch (err) {
      console.error('無法與API取得資料', err)
      next(err)
    }
  },
  getRestaurant: async (req, res) => {
    const { rid } = req.params
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?fields=photos,name,rating,user_ratings_total,price_level,business_status,formatted_address,opening_hours,website,formatted_phone_number,reviews,url&language=zh-TW&place_id=${rid}&key=${API_KEY}`
      )
      const { data } = response
      const openNow = data.result.opening_hours.open_now?"營業中" : "已打烊"
      if (data.status === 'OK') {
        if (!data.result.website) {
          res.json({ status: 'success', data: {...data.result, openNow}})
        } else {
          const parsedUrl = new URL(data.result.website).hostname
          const result = { ...data.result, parsedUrl, openNow }
          res.json({ status: 'success', data: result })
        }
      }
    } catch (error) {
      console.error('無法取得地點詳細資料', error)
      res.status(500).json({ status: 'error', message: '無法取得地點詳細資料' })
    }
  }
}

module.exports = mapController