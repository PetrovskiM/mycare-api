const mongo = require('../data/location-mongo')

const HttpError = require('../../../core/common/http-error')

const getLocationById = async (req, res, next) => {
  const appointment = await mongo.getLocationById(req, res, next)

  if (!appointment) {
    const appointmentId = req.params.id
    next(new HttpError(`Could not find an location for provided id: ${appointmentId}`, 404))
  } else {
    res.status(201).json(appointment)
  }
}

const getLocations = async (req, res, next) => {
  const appointments = await mongo.getLocations(req, res, next)

  if (!appointments) {
    next(new HttpError('Could not fetch locations.', 404))
  } else {
    res.status(201).json(appointments)
  }
}

const createLocation = async (req, res, next) => {
  const appointment = await mongo.createLocation(req, res, next)

  if (!appointment) {
    next(new HttpError('Could not create location.', 422))
  } else {
    res.status(201).json(appointment)
  }
}

const updateLocation = async (req, res, next) => {
  const updatedAppointment = await mongo.updateLocation(req, res, next)

  if (!updatedAppointment) {
    const appointmentId = req.params.id
    next(new HttpError(`Could not update location with id: ${appointmentId}.`, 422))
  } else {
    res.status(200).json(updatedAppointment)
  }
}

const deleteLocation = async (req, res, next) => {
  const deletedAppointment = await mongo.deleteLocation(req, res, next)

  if (!deletedAppointment) {
    const appointmentId = req.params.id
    next(new HttpError(`Could not delete location with id: ${appointmentId}`, 422))
  } else {
    res.status(200).json({ message: 'Location deleted successfully.' })
  }
}

exports.getLocations = getLocations
exports.getLocationById = getLocationById
exports.createLocation = createLocation
exports.deleteLocation = deleteLocation
exports.updateLocation = updateLocation
