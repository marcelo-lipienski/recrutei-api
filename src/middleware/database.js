const mongoose = require('mongoose')

mongoose.connect('mongodb://172.18.0.3/recrutei', { useNewUrlParser: true })
mongoose.connection.on('error', function (err) { console.log({ status: 500 }) })
