const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  favoriteRestaurants: [{
    restaurantName: { type: String },
    address: { type: String },
    priceLevel: { type: Number },
    restaurantId: { type: String },
    comment: { type: String },
    photo: { type: String }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)