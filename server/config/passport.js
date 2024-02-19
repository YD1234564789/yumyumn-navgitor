const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return done(null, false, { message: 'That email is not registered!'})
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return done(null, false, { message: 'Email or Password incorrect.'})
        return done(null, user)
      })
    })
    .catch(err => done(err, false))
}))

// google登入
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  profileFields: ['email', 'displayName']
},
  (accessToken, refreshToken, profile, cb) => {
    const { email, name } = profile._json
    User.findOne({ where: { email } })
      .then(user => {
        if (user) return cb(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => cb(null, user))
          .catch(err => cb(err, false))
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))
})


module.exports = passport