const mongoose = require('mongoose')

const { AddressSchema } = require('./address-schema')

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  phone: { type: String, required: false },
  imageUrl: { type: String, required: false }
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

exports.Location = mongoose.model('Location', locationSchema)
exports.LocationSchema = locationSchema
