const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const serviceOrder = require('./src/ServiceOrder')

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200
}

// Database and CORS middleware
app.use(cors(corsOptions), function (req, res, next) {
  mongoose.connect('mongodb://172.18.0.3/recrutei', { useNewUrlParser: true })
  req.database = mongoose.connection
  req.database.on('error', function () {
    res.status(500).send('Something broke!')
  })

  next()
})

app.use(express.json())
app.use('/service-order', serviceOrder)

app.listen(8000)
