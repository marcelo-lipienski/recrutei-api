const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('./model/UserSchema')
const ServiceOrder = require('./model/ServiceOrderSchema')

router.get('/', function (req, res) {
  let roles = [ 'support', 'dev', 'analytics' ]
  let users = roles.map(createUsers)

  let support = users.shift()
  let serviceOrders = [ support, support, support ]

  serviceOrders.map(createServiceOrders)

  return res.send({ success: true })
})

function createUsers(role) {
  let newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: role + '@recrutei.com.br',
    password: '$2b$12$bvMxNJ91ZyZb58Ffjx6ZAeQbXETo0mIorYrcwkF4s.NpWPBPFxnMe',
    role: role
  })

  newUser.save()

  return newUser
}

function createServiceOrders(owner) {
  let newServiceOrder = new ServiceOrder({
    _id: new mongoose.Types.ObjectId(),
    owner: owner._id,
    description: 'Uma solicitação de serviço'
  })

  newServiceOrder.save()

  return newServiceOrder
}

module.exports = router
