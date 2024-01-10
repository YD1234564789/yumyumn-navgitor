if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')
  for (let i = 1; i < 3; i++){
    User.create({
      email: `user${i}@example.com`,
      password: await bcrypt.hash('12345678', 10)
    })
  }
  console.log('done')
})
