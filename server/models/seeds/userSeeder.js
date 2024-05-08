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
        location: {
          lat: 25.0425837,
          lng: 121.5306308
        },
        rating: 3,
        userRatingsTotal: 544,
        priceLevel: 2,
        isFavorite: true,
        restaurantId: 'ChIJ81hgenupQjQR3tQOkVvFWto',
        photo:'ATplDJbHQJQx4VoDcZcx6PDXMucPW5sv0kIPJ-o1PLJzoixwR197XiHodlmPlPiwDvEufOAkytXauf0yB6ag1pVr1V8mf4pNISkIp35RP01L0rRHEFfk4NQvbPOaIGz9ojr642oO8NVg7nt_zQyJs7EmSaiwj0XwkM3e4Meer2AuWGTFAjYY',
        comment: `user${i}給五星，食物很好吃!!`
      },{
        restaurantName: '麵屋雞金 光華店',
        address: '新生南路一段6號1樓',
        location: {
          lat: 25.0440359,
          lng: 121.53013
        },
        rating: 3,
        userRatingsTotal: 234,
        priceLevel: 2,
        isFavorite: true,
        restaurantId: 'ChIJwTPCxfKpQjQRb69IzY6LiqQ',
        photo:'ATplDJYo7dvlrlZ7eL7ORWfzJx2xXmvQMCOr8oq93PgH0UZ_7KNDZ9p5lm9mE9sNIJCiO770xvHx5_Zox_0NMZMwHP2DM6Vusigx2-ZuNBHVbAcHrrldj50T76GDrgrrdA_jgdyMU3kIJCbWxzkd9YzqHFs9l7e3DJakUnwFM9RdrrEQEjrM',
        comment: `user${i} 四星，平價且環境不錯。`
      }]
    })
  }
  console.log('Create userSeed done!')
})
