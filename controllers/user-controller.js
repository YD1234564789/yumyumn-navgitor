const User = require('../models/user')
const bcrypt = require('bcryptjs')
const userController = {
  loginPage: (req, res) => {
    res.render('login')
  },
  login: (req, res) => {
    res.redirect('/index')
  },
  signupPage: (req, res) => {
    res.render('signup')
  },
  signup: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    User.findOne({ email })
      .then(user => {
        if (user) {
          console.log('User already exists.')
          res.render('signup', {
            name,
            email,
            password,
            passwordCheck
          })
        } else {
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/login')
  },
  addFavorite: async (req, res) => {
    try {
      const { restaurantName, address, priceLevel, restaurantId } = req.body
      const userId = req.user._id
      const favoriteRestaurants = {
        restaurantName,
        address,
        priceLevel,
        restaurantId
      }
      const data = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { favoriteRestaurants } },
        // new 會回傳更新後結果, 遮蔽密碼
        { new: true, projection: { password: 0 } }
      )

      if (!data) {
        return res.status(404).json({ status: 'error', message: '找不到用戶' })
      }

      res.json({ status: 'success', data })
    } catch (error) {
      console.error('新增最愛餐廳失敗：', error)
      res.status(500).json({ status: 'error', message: '新增最愛餐廳失敗' })
    }
  },
  removeFavorite: async (req, res) => {
    try {
      const restaurantId = req.params.rid
      const userId = req.user._id

      // 使用 findOneAndUpdate() 將符合條件的最愛餐廳從陣列中刪除
      const removeRestaurant = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { favoriteRestaurants: { restaurantId } } },
        { new: true, projection: { password: 0 } }
      )

      // 檢查是否找到了用戶，以及是否成功更新最愛餐廳資料
      if (!removeRestaurant) {
        return res.status(404).json({ status: 'error', message: '找不到用戶' })
      }

      // 返回更新後的用戶資料
      res.json({ status: 'success', data: removeRestaurant })
    } catch (error) {
      console.error('刪除最愛餐廳失敗：', error)
      res.status(500).json({ status: 'error', message: '刪除最愛餐廳失敗' })
    }
  },
  postComment: async (req, res) => {
    try {
      const { comment } = req.body
      const restaurantId = req.params.rid
      const userId = req.user._id

      // 使用 findOneAndUpdate() 將評論加入到用戶的 favoriteRestaurants 中的對應餐廳中
      const updateComment = await User.findOneAndUpdate(
        { _id: userId, "favoriteRestaurants.restaurantId": restaurantId },
        { $set: { "favoriteRestaurants.$.comment": comment } },
        { new: true, projection: { password: 0 } }
      )
      // 檢查是否找到了用戶，以及是否成功更新評論
      if (!updateComment) {
        return res.status(404).json({ status: 'error', message: '找不到用戶或餐廳' });
      }

      // 返回更新後的用戶資料
      res.json({ status: 'success', data: updateComment });
    } catch (error) {
      console.error('發表評論失敗：', error);
      res.status(500).json({ status: 'error', message: '發表評論失敗' });
    }
  }
}

module.exports = userController