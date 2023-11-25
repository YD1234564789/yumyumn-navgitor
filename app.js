const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => res.render('index'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

//google map功能>登入>(金流)