const axios = require('axios')
const API_KEY = process.env.GOOGLE_MAPS_KEY
const mapController = {
  // getTextSearchRestaurants: async (req, res) => {
  //   try{
  //     const { type, distance, rating, priceLevel, latitude, longitude } = req.body
  //     console.log('latitude', latitude)
  //     console.log('longitude', longitude)
  //     const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
  //       params: {
  //         location: `${latitude},${longitude}`,
  //         radius: distance, 
  //         keyword: type + '餐廳',
  //         type: 'restaurant',
  //         language: "zh-TW",
  //         minprice: '0',
  //         maxprice: priceLevel,
  //         opennow: true,
  //         key: API_KEY
  //       }
  //     })
  //     // 價格與評分篩選並以高評價排序
  //     const filteredResults = response.data.results
  //       .filter(result => result.rating >= rating)
  //       .sort((a, b) => b.rating - a.rating)
      
  //     console.log('filteredResults', filteredResults)

  //     res.render('index', { filteredResults, priceLevel, type })


  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).json({ error: 'Internal Server Error'})
  //   }
  // }
}

module.exports = mapController