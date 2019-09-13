const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('./model/UserSchema')

// GET /service-order/
// Retrieves service order backlog
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    res.send({ users: users })
  })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (!user) {
      res.status(401).send({ error: 'Invalid credentials', user: user })
      return next(err)
    }

    if (err) {
      res.status(500).send({ error: err })
      return next(err)
    }

    req.logIn(user, { session: false }, function (err) {
      if (err) { return next(err) }

      const body = { _id: user._id, username: user.username }
      const token = jwt.sign({ user: body }, 'secret')

      return res.json({ token })
    })
  })(req, res, next)
})

module.exports = router
