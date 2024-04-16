const {validationResult} = require('express-validator')
const mongo = require('../data/appointments-mongo')

const HttpError = require("../../../core/common/http-error");

const getAppointmentById = async (req, res, next) => {
    const appointment = await mongo.getAppointmentById(req, res, next)

    if (!appointment) {
        const appointmentId = req.params.id;
        next(new HttpError(`Could not find an appointment for provided id: ${appointmentId}`, 404))
    } else {
        res.status(201).json(appointment)
    }
}

const getAppointments = async (req, res, next) => {
    const appointments = await mongo.getAppointments(req, res, next)

    if (!appointments) {
        next(new HttpError(`Could not fetch appointments.`, 404))
    } else {
        res.status(201).json(appointments)
    }
}

const createAppointment = async (req, res, next) => {
    validateCreateUpdatePlace(req, next)
    const appointment = await mongo.createAppointment(req, res, next)

    if (!appointment) {
        next(new HttpError(`Could not create appointments.`, 422))
    } else {
        res.status(201).json(appointment)
    }
}

const updateAppointment = async (req, res, next) => {
    validateCreateUpdatePlace(req, next)
    const updatedAppointment = await mongo.updateAppointment(req, res, next)

    if (!updatedAppointment) {
        const appointmentId = req.params.id;
        next(new HttpError(`Could not update appointment with id: ${appointmentId}.`, 422))
    } else {
        res.status(200).json(updatedAppointment);
    }
}

const validateCreateUpdatePlace = (req, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        next(new HttpError('Invalid Input', 422))
    }
}

const deleteAppointment = async (req, res, next) => {
    const deletedAppointment = await mongo.deleteAppointment(req, res, next)

    if (!deletedAppointment) {
        const appointmentId = req.params.id;
        next(new HttpError(`Could not delete appointment with id: ${appointmentId}`, 422))
    } else {
        res.status(200).json({message: 'Deleted appointment.'});
    }
}

exports.getAppointments = getAppointments;
exports.getAppointmentById = getAppointmentById;
exports.createAppointment = createAppointment;
exports.deleteAppointment = deleteAppointment;
exports.updateAppointment = updateAppointment;
