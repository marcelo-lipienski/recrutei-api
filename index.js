const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const bodyParser = require('body-parser')

require('./src/middleware/database')
require('./src/middleware/auth')

const corsOptions = require('./src/middleware/cors')
const User = require('./src/User')
const serviceOrder = require('./src/ServiceOrder')

// CORS middleware
app.use(cors(corsOptions), function (req, res, next) {
  next()
})

app.use(express.json())
app.use(passport.initialize())

app.use('/service-order', serviceOrder)
app.use('/user', User)

app.listen(8000)
