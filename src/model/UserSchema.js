const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  password: String,
  role: { type: String, enum: [ 'support', 'dev', 'analytics' ] },
  token: String
})

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
