const mongoose = require('mongoose')
const uuidv4 = require('uuid').v4

const AppointmentStatus = require('./appointment-status')

const appointmentSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  handledBy: { type: String, required: true },
  estimatedDurationMinutes: { type: Number, required: false },
  conclusion: { type: String, required: false },
  status: { type: String, enum: AppointmentStatus, required: true },
  location: { type: String, required: true, ref: 'Location' }
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
