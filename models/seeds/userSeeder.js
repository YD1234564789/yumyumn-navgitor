const bcrypt = require('bcryptjs')
const User = require('../user')
 
const db = require('../../config/mongoose')

db.once('open', async () => {
  for (let i = 1; i < 3; i++){
    User.create({
      email: `user${i}@example.com`,
      password: await bcrypt.hash('12345678', 10)
    })
  }
  console.log('done')
})
