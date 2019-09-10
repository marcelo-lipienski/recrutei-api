const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const serviceOrder = require('./model/ServiceOrderSchema')

// GET /service-order/
// Retrieves service order backlog
router.get('/', function (req, res) {
  req.database.once('open', function () {
    serviceOrder.find({}, function (err, docs) {
      res.send({ backlog: docs })
    })
  })
})

// GET /service-order/:id
// Retrieves a service order
router.get('/:id', function (req, res) {
  req.database.once('open', function () {
    serviceOrder.findById(req.params.id, function (err, doc) {
      if (err) { return res.send({ operation: 'find', success: false })}
      res.send({ serviceOrder: doc })
    })
  })
})

// POST /service-order/
// Creates a service order
router.post('/', function (req, res) {
  const newServiceOrder = new serviceOrder({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description
  })

  req.database.once('open', function () {
    newServiceOrder.save(function (err) {
      if (err) { return res.send({ operation: 'create', success: false }) }
      return res.send({ serviceOrder: newServiceOrder })
    })
  })

  // PUT /service-order/:id
  // Updates a service order
  router.put('/:id', function (req, res) {
    serviceOrder.findById(req.params.id, function (err, doc) {
      doc.description = req.body.description
      doc.save(function (err) {
        if (err) { return res.send({ operation: 'update', success: false }) }
        return res.send({ serviceOrder: doc })
      })
    })
  })
})

module.exports = router
