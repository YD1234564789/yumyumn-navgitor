const axios = require('axios')
const API_KEY = process.env.GOOGLE_MAPS_KEY
const mapController = {
  getRestaurants: async(req, res) => {
    const { type, rating, distance, priceLevel, latitude, longitude } = req.body
    console.log(req.body)
    try{
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${type}餐廳&location=${latitude},${longitude}&radius=${distance}&opennow=true&minprice=0&maxprice=${priceLevel}&type=restaurant&key=${API_KEY}`
      )
      const results = response.data
      console.log('results', results)
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
    } catch (err) {
      res.json({ status: 'error', message: '無法與API取得資料' })
    }
  }
}

module.exports = mapController