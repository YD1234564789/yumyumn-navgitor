const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userController = {
  login: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d'})
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        },
        message: '登入成功！'
      })
    } catch (error) {
      next(err)
    }
  },
  signup: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    if (password !== passwordCheck) throw new Error('Passwords do not match!')
    return User.findOne({ email })
      .then(user => {
        if (user) {
          console.log('User already exists.')
          res.status(500).json({
            status: 'error',
            data: {
              "Error Message": "email used"
            }
          })
          req.body = []
        } else {
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then((createdUser) => {
              const user = createdUser.toJSON()
              delete createdUser.password
              delete createdUser.passwordCheck
              return res.json({
                status: 'success',
                data: {
                  ...user
                },
                message: '註冊成功！請再次登入'
              })
            })
            .catch(err => next(err))
        }
      })
      .catch(err => next(err))
  },
  getFavorites: async (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      if (!req.user) {
        return res.status(404).json({ status: 'error', message: '找不到用戶' })
      }
      res.json({ status: 'success', user: userData })
    } catch (err) {
      console.error('取得最愛餐廳失敗，請重試：', err)
      next(err)
    }
  },
  addFavorite: async (req, res, next) => {
    try {
      const { restaurantName, address, priceLevel, restaurantId, photo, location, rating, userRatingsTotal } = req.body
      const userId = req.user._id
      const favoriteRestaurants = {
        restaurantName,
        address,
        location,
        rating,
        userRatingsTotal,
        isFavorite: true,
        priceLevel,
        restaurantId,
        photo
      }
      // 資料庫找到用戶
      const user = await User.findOne(userId)
      const isRestaurantAlreadyFavorited = user.favoriteRestaurants.some(restaurant => restaurant.restaurantId === restaurantId)
      if (!user) {
        return res.status(404).json({ status: 'error', message: '找不到用戶' })
      }
      // 判斷最愛列表是否已存在該餐廳ID
      if (isRestaurantAlreadyFavorited) {
        res.json({ status: 'error', message: '餐廳已加入最愛'})
      } else {
        const addFavorite = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { favoriteRestaurants } },
          // new 會回傳更新後結果, 遮蔽密碼
          { new: true, projection: { password: 0 } }
        )
        res.json({ status: 'success', data: addFavorite, message: '加入最愛成功！' })
      }
    } catch (err) {
      console.error('新增最愛餐廳失敗，請重試：', err)
      next(err)
    }
  },
  removeFavorite: async (req, res) => {
    try {
      const restaurantId = req.params.rid
      const userId = req.user._id

      // 資料庫找到用戶
      const user = await User.findOne(userId)
      const isRestaurantAlreadyFavorited = user.favoriteRestaurants.some(restaurant => restaurant.restaurantId === restaurantId)
      if (!user) {
        return res.status(404).json({ status: 'error', message: '找不到用戶' })
      }
      // 判斷最愛列表是否已存在該餐廳ID
      if (!isRestaurantAlreadyFavorited) {
        res.json({ status: 'error', message: '該餐廳還不是你的最愛!' })
      } else {
        // 使用 findOneAndUpdate() 將符合條件的最愛餐廳從陣列中刪除
        const removeRestaurant = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { favoriteRestaurants: { restaurantId } } },
          { new: true, projection: { password: 0 } }
        )
        // 返回更新後的用戶資料
        res.json({ status: 'success', data: removeRestaurant, message: '移除最愛成功！' })
      }

    } catch (err) {
      console.error('刪除最愛餐廳失敗，請重試：', err)
      next(err)
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
        return res.status(404).json({ status: 'error', message: '找不到用戶或餐廳' })
      }

      // 返回更新後的用戶資料
      res.json({ status: 'success', data: updateComment, message: '備註成功！' });
    } catch (err) {
      console.error('備註失敗請重試：', err);
      next(err)
    }
  }
}

module.exports = userController