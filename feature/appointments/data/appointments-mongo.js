const Appointment = require('./models/appointment-schema')
const HttpError = require('../../../core/common/http-error')
const { Location } = require('../../location/data/model/location-schema')
const AppointmentResponse = require('./models/appointment-response')
const AppointmentStatus = require('../data/models/appointment-status')

const createAppointment = async (req, res, next) => {
  const { name, date, handledBy, location, conclusion, status, estimatedDurationMinutes } = req.body
  const appointment = new Appointment({
    name,
    date,
    handledBy,
    location,
    conclusion,
    status,
    estimatedDurationMinutes
  })

  let dbLocation
  try {
    dbLocation = await Location.findById(location)
  } catch (err) {
    const error = new HttpError(
      'Creating an Appointment failed, please try again.',
      500
    )
    return next(error)
  }

  if (!dbLocation) {
    const error = new HttpError(
            `Creating an Appointment failed, no location found for ${location}`,
            404
    )
    return next(error)
  }

  try {
    await appointment.save()
    return AppointmentResponse.create(appointment, dbLocation)
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
    let appointments
    if (Object.keys(req.query).length === 0) {
      appointments = Appointment.find().populate('location')
    } else {
      appointments = Appointment.aggregate()
        .lookup({
          from: 'locations',
          localField: 'location',
          foreignField: '_id',
          as: 'location'
        })
        .unwind({ path: '$location' })
        .match({ 'location.name': { $regex: req.query.location || '', $options: 'i' } })
        .match({ name: { $regex: req.query.name || '', $options: 'i' } })
      if (req.query.status && Object.prototype.hasOwnProperty.call(AppointmentStatus, req.query.status)) {
        appointments.match({ status: AppointmentStatus[req.query.status] })
      }
    }
    return await appointments
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
