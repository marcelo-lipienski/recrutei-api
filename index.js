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
const Populate = require('./src/Populate')
const Analytics = require('./src/Analytics')

// CORS middleware
app.use(cors(corsOptions), function (req, res, next) {
  next()
})

app.use(express.json())
app.use(passport.initialize())

app.use('/analytics', Analytics)
app.use('/populate', Populate)
app.use('/user', User)
app.use('/service-order', serviceOrder)

app.listen(8000)
