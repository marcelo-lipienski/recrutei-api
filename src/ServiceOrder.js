const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const moment = require('moment')

const serviceOrder = require('./model/ServiceOrderSchema')

// GET /service-order/
// Retrieves service order backlog
router.get('/',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    serviceOrder
      .find({})
      .sort({ created_at: -1 })
      .exec(function (err, docs) {
        res.send({ backlog: docs })
      })
  }
)

router.get('/pending/:id',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {

    let query = {
      resolver: mongoose.Types.ObjectId(req.params.id),
      updated_at: null
    }

    serviceOrder
      .find(query)
      .sort({ created_at: -1 })
      .exec(function (err, docs) {
        res.send({ backlog: docs })
      })
  }
)

router.get('/open',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    serviceOrder
      .find({ resolver: null })
      .sort({ created_at: -1 })
      .exec(function (err, docs) {
        res.send({ backlog: docs })
      })
  }
)

router.get('/closed',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {

    let closed = {
      resolver: { $ne: null },
      updated_at: { $ne: null }
    }

    serviceOrder
      .find(closed)
      .sort({ created_at: -1 })
      .exec(function (err, docs) {
        res.send({ backlog: docs })
      })
  }
)

// GET /service-order/:id
// Retrieves a service order
router.get('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
  serviceOrder.findById(req.params.id).populate([
    { path: 'resolver', select: 'username'},
    { path: 'owner', select: 'username' }
  ]).then((doc) => {
    res.send({ serviceOrder: doc })
  }).catch(() => {
    res.send({ success: false })
  })
})

// POST /service-order/
// Creates a service order
router.post('/', function (req, res) {
  const newServiceOrder = new serviceOrder({
    _id: new mongoose.Types.ObjectId(),
    owner: new mongoose.Types.ObjectId(req.body.owner),
    description: req.body.description
  })

  newServiceOrder.save(function (err) {
    if (err) { return res.send({ operation: 'create', success: false }) }
    return res.send({ serviceOrder: newServiceOrder })
  })
})

// PUT /service-order/:id
// Updates a service order
router.put('/:id', function (req, res) {
  let this_ = this
  serviceOrder.findById(req.params.id).then((doc) => {
    let { resolver, reply } = req.body

    if (resolver) { doc.resolver = resolver }
    if (reply) {
      doc.reply = reply
      doc.updated_at = moment().format()
    }

    doc.save().then((updated) => {
      serviceOrder.findById(updated._id).populate([
        { path: 'resolver', select: 'username'},
        { path: 'owner', select: 'username' }
      ]).then((finalObject) => {
        res.send({ success: true, serviceOrder: finalObject })
      }).catch(() => {
        res.send({ success: false })
      })
    }).catch(() => {
      res.send({ success: false })
    })
  }).catch(() => {
    res.send({ success: false })
  })
})

module.exports = router
