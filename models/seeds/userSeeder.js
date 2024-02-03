const bcrypt = require('bcryptjs')
const User = require('../user')
 
const db = require('../../config/mongoose')

db.once('open', async () => {
  for (let i = 1; i < 3; i++){
    User.create({
      name: `user${i}`,
      email: `user${i}@example.com`,
      password: await bcrypt.hash('12345678', 10),
      favoriteRestaurants: [{
        restaurantName: 'B Line by A Train',
        address: '忠孝東路二段104號2樓',
        priceLevel: 2,
        restaurantId: 'ChIJ81hgenupQjQR3tQOkVvFWto',
        comment: `user${i}給五星，食物很好吃!!`
      },{
        restaurantName: '麵屋雞金 光華店',
        address: '新生南路一段6號1樓',
        priceLevel: 2,
        restaurantId: 'ChIJwTPCxfKpQjQRb69IzY6LiqQ',
        comment: `user${i} 四星，平價且環境不錯。`
      }]
    })
  }
  console.log('done')
})
