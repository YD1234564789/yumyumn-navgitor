const axios = require('axios')
const API_KEY = process.env.GOOGLE_MAPS_KEY
const mapController = {
  getRestaurants: async(req, res) => {
    const { type, rating, distance, priceLevel, latitude, longitude } = req.body
    try{
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${type}餐廳&location=${latitude},${longitude}&radius=${distance}&opennow=true&minprice=0&maxprice=${priceLevel}&type=restaurant&key=${API_KEY}`
      )
      const results = response.data
      if (results.status === 'OK') {
        // 篩選符合評價結果
        const rateFilter = results.results.filter(result => result.rating > rating)
        if (rateFilter.length> 0) {
          res.json({ status: 'success', data: rateFilter })
        } else {
          res.json({ status: 'success', data: [], message: '該條件無搜索結果' })
        }
      } else {
        res.json({ status: results.status, data: results.results })
      }
    } catch (error) {
      res.json({ status: error, message: '無法與API取得資料' })
    }
  },
  getRestaurant: async(req, res) => {
    const { rid } = req.params
    try{
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
      res.json({ status: 'error', message: '無法取得地點詳細資料' })
    }
  }
}

module.exports = mapController