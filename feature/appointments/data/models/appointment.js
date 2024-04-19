const mongoose = require('mongoose')

const { LocationSchema } = require('./location')

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  handledBy: { type: String, required: true },
  estimatedDurationMinutes: { type: Number, required: true },
  location: { type: LocationSchema, required: false },
  conclusion: { type: String, required: false }
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

module.exports = mongoose.model('Appointment', appointmentSchema)
