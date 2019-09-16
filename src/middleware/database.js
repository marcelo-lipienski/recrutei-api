const mongoose = require('mongoose')

let url = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME

mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.on('error', function (err) { console.log({ status: 500 }) })
