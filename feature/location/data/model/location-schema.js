const mongoose = require('mongoose')
const uuidv4 = require('uuid').v4

const locationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  address: {
    name: { type: String, required: true },
    additionalDirections: { type: String, required: false }
  },
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
