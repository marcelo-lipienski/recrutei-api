const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceOrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('ServiceOrder', serviceOrderSchema)
