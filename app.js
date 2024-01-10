if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const port = process.env.PORT || 3000
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs.engine({ extname: '.hbs'}))
app.set('view engine', 'hbs')
// 可解析POST表單內容 req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// 增加可覆蓋的PUT DELETE方法
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

//google map功能>登入>(金流)
// Maps JavaScript API  取得目前位置與地圖 
