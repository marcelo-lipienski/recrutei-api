const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

require('./src/middleware/database')
require('./src/middleware/auth')

const corsOptions = require('./src/middleware/cors')
const User = require('./src/User')
const userSchema = require('./src/model/UserSchema')
const serviceOrder = require('./src/ServiceOrder')

// CORS middleware
app.use(cors(corsOptions), function (req, res, next) {
  next()
})

app.use(express.json())
app.use(passport.initialize())

app.get('/populate', function (req, res) {
  let newUser = new userSchema({
    _id: new mongoose.Types.ObjectId(),
    username: 'support@recrutei.com.br',
    password: '$2b$12$bvMxNJ91ZyZb58Ffjx6ZAeQbXETo0mIorYrcwkF4s.NpWPBPFxnMe',
    role: 'support'
  })

  newUser.save(function (err) {
    if (err) { return res.send({ operation: 'populate', success: false }) }
  })

  newUser = new userSchema({
    _id: new mongoose.Types.ObjectId(),
    username: 'dev@recrutei.com.br',
    password: '$2b$12$bvMxNJ91ZyZb58Ffjx6ZAeQbXETo0mIorYrcwkF4s.NpWPBPFxnMe',
    role: 'dev'
  })

  newUser.save(function (err) {
    if (err) { return res.send({ operation: 'populate', success: false }) }
  })

  newUser = new userSchema({
    _id: new mongoose.Types.ObjectId(),
    username: 'analytics@recrutei.com.br',
    password: '$2b$12$bvMxNJ91ZyZb58Ffjx6ZAeQbXETo0mIorYrcwkF4s.NpWPBPFxnMe',
    role: 'analytics'
  })

  newUser.save(function (err) {
    if (err) { return res.send({ operation: 'populate', success: false }) }
  })

  return res.send({ success: true })
})

app.use('/user', User)
app.use('/service-order', serviceOrder)

app.listen(8000)
