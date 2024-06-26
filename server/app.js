if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./routes')
const passport = require('./config/passport')
const app = express()
const port = process.env.PORT || 5000
require('./config/mongoose')

// 可解析POST表單內容 req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 要在session後啟用
app.use(passport.initialize())
app.use(passport.session())
// 讓登入與用戶資料常駐，提供view做存取
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 跨站設置
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000'}))
// 增加可覆蓋的PUT DELETE方法
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
