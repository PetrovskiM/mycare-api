const uuidv4 = require('uuid').v4

const HttpError = require('../../../core/common/http-error')
const { Location } = require('./model/location-schema')

const createLocation = async (req, res, next) => {
  const { name, address, phone, imageUrl } = req.body
  const appointment = new Location({
    id: uuidv4(),
    name,
    address,
    phone,
    imageUrl
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

const getLocations = async (req, res, next) => {
  try {
    return await Location.find().exec()
  } catch (err) {
    const error = new HttpError(
            `Could not fetch appointments, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

const getLocationById = async (req, res, next) => {
  const locationId = req.params.id
  try {
    return await Location.findById(locationId)
  } catch (err) {
    const error = HttpError(
        `Could not fetch location for id: ${locationId}, please try again. Error: ${err}`,
        500
    )
    next(error)
  }
}

const updateLocation = async (req, res, next) => {
  const locationId = req.params.id
  const { name, date } = req.body
  try {
    const filter = { _id: locationId }
    const update = {
      name,
      date
    }
    return Location.findOneAndUpdate(
      filter,
      update, {
        new: true
      }
    )
  } catch (err) {
    const error = new HttpError(
            `Could not update appointment for id: ${locationId}, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

const deleteLocation = async (req, res, next) => {
  const locationId = req.params.id
  try {
    const filter = { _id: locationId }
    return await Location.findOneAndDelete(filter)
  } catch (err) {
    const error = new HttpError(
            `Could not update appointment for id: ${locationId}, please try again. Error: ${err}`,
            500
    )
    next(error)
  }
}

exports.createLocation = createLocation
exports.getLocations = getLocations
exports.getLocationById = getLocationById
exports.updateLocation = updateLocation
exports.deleteLocation = deleteLocation
