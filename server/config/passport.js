const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    // passwordField: 'password',
    // passReqToCallback: true
  },
  // authenticate user
  (email, password, cb) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return cb(null, false)
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
             return cb(null, false)
            }
            return cb(null, user)
        })
      })
      .catch((err) => cb(err, false))
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

// JWT 登入
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findById(jwtPayload._id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .lean()
    .then(user => cb(null, user))
    .catch(err => cb(err, null))
})


module.exports = passport