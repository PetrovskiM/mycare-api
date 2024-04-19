const uuidv4 = require('uuid').v4

const Appointment = require('../data/models/appointment')
const HttpError = require('../../../core/common/http-error')

const createAppointment = async (req, res, next) => {
  const { name, date, handledBy, location, conclusion, status } = req.body
  const appointment = new Appointment({
    id: uuidv4(),
    name,
    date,
    handledBy,
    location,
    conclusion,
    status
  })
  try {
    return await appointment.save()
  } catch (err) {
    const error = new HttpError(
            `Creating place failed, please try again. Error: ${err}`,
            500
    )
    return next(error)
  }
}

const getAppointments = async (req, res, next) => {
  try {
    return await Appointment.find().exec()
  } catch (err) {
    const error = new HttpError(
            `Could not fetch appointments, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

const getAppointmentById = async (req, res, next) => {
  const appointmentId = req.params.id
  try {
    return await Appointment.findById(appointmentId)
  } catch (err) {
    const error = new HttpError(
            `Could not fetch appointment for id: ${appointmentId}, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

const updateAppointment = async (req, res, next) => {
  const appointmentId = req.params.id
  const { name, date } = req.body
  try {
    const filter = { _id: appointmentId }
    const update = {
      name,
      date
    }
    return Appointment.findOneAndUpdate(
      filter,
      update, {
        new: true
      }
    )
  } catch (err) {
    const error = new HttpError(
            `Could not update appointment for id: ${appointmentId}, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

const deleteAppointment = async (req, res, next) => {
  const appointmentId = req.params.id
  try {
    const filter = { _id: appointmentId }
    return await Appointment.findOneAndDelete(filter)
  } catch (err) {
    const error = new HttpError(
            `Could not update appointment for id: ${appointmentId}, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

exports.createAppointment = createAppointment
exports.getAppointments = getAppointments
exports.getAppointmentById = getAppointmentById
exports.updateAppointment = updateAppointment
exports.deleteAppointment = deleteAppointment
