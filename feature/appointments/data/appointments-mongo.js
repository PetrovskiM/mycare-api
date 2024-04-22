const uuidv4 = require('uuid').v4

const Appointment = require('./models/appointment-schema')
const HttpError = require('../../../core/common/http-error')
const { Location } = require('../../location/data/model/location-schema')
const AppointmentResponse = require('./models/appointment-response')

const createAppointment = async (req, res, next) => {
  const { name, date, handledBy, locationId, conclusion, status } = req.body
  const appointment = new Appointment({
    id: uuidv4(),
    name,
    date,
    handledBy,
    locationId,
    conclusion,
    status
  })

  let location
  try {
    location = await Location.findById(locationId)
  } catch (err) {
    const error = new HttpError(
      'Creating an Appointment failed, please try again.',
      500
    )
    return next(error)
  }

  if (!location) {
    const error = new HttpError(
          `Creating an Appointment failed, no location found for ${locationId}`,
          404
    )
    return next(error)
  }

  try {
    await appointment.save()
    return AppointmentResponse.create(appointment, location)
  } catch (err) {
    const error = new HttpError(
            `Creating appointment failed, please try again. Error: ${err}`,
            500
    )
    return next(error)
  }
}

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().exec()
    const locationIds = appointments.map((appointment) => appointment.locationId)
    const locations = await Location.find().where('_id').in(locationIds)
    const appointmentResponses = []
    for (const appointment of appointments) {
      for (const location of locations) {
        if (appointment.locationId.toString() === location.id) {
          appointmentResponses.push(AppointmentResponse.create(appointment, location))
          break
        }
      }
    }
    return appointmentResponses
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
    const appointment = await Appointment.findById(appointmentId)
    const location = await Location.findById(appointment.locationId)
    return AppointmentResponse.create(appointment, location)
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
