const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  additionalDirections: { type: String, required: false }
},
{
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

exports.Address = mongoose.model('Address', addressSchema)
exports.AddressSchema = addressSchema
