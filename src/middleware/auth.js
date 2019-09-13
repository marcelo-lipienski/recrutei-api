const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/UserSchema')

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    if (!user.isValidPassword(password)) { return done(null, false) }
    return done(null, user)
  })
}))

passport.use(new JwtStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
}, function (token, done) {
  return done(null, token.user)
}))
