const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ extname: '.hbs'}))
app.set('view engine', 'hbs')
// 可解析POST表單內容 req.body
app.use(express.urlencoded({ extended: true }))
// 增加可覆蓋的PUT DELETE方法
app.use(methodOverride('_method'))
app.get('/', (req, res) => res.render('index'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

//google map功能>登入>(金流)
// Maps JavaScript API  取得目前位置與地圖 