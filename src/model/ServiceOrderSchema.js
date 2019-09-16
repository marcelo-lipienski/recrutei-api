const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceOrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  resolver: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  description: String,
  reply: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null }
})

module.exports = mongoose.model('ServiceOrder', serviceOrderSchema)
