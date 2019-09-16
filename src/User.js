const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('./model/UserSchema')

// POST /verify
// Validates credentials
router.post('/verify', function (req, res) {
  let token = req.body.token

  if (!token) { return res.json({ error: 'Invalid token' }) }

  User.findOne({ token }, '_id role', function (err, user) {
    if (err || !user) { return res.json({ error: 'Invalid token' }) }
    return res.json({ _id: user._id, role: user.role })
  })
})

// GET /service-order/
// Retrieves service order backlog
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) { res.send({ err }) }
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
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

      User.findOne({ username: user.username }, function (err, userUpdate) {
        if (err) {
          return res.status(401).send({ error: "Invalid credentials" })
        }

        userUpdate.token = token
        userUpdate.save(function(err) {
          if (err) { return res.status(500).send({ error: "Couldn't set JWT token to user"}) }
        })
      })

      return res.json({ token: token, role: user.role })
    })
  })(req, res, next)
})

module.exports = router
