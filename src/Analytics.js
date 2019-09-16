const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const ServiceOrder = require('./model/ServiceOrderSchema')

router.get('/',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    let responseObject = {
      total: 0,
      open: 0
    }

    Promise.all([
      new Promise(function (resolve, reject) {
        return resolve(ServiceOrder.countDocuments())
      }),
      new Promise(function (resolve, reject) {
        return resolve(ServiceOrder.where({ resolver: null }).countDocuments())
      }),
      new Promise(function (resolve, reject) {
        return resolve(ServiceOrder.where({ resolver: { $ne: null } }).countDocuments())
      }),
    ]).then(function (result) {
      responseObject.total = result[0],
      responseObject.open = result[1],
      responseObject.pending = result[2]

      res.json(responseObject)
    })

  }
)
module.exports = router
