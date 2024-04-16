const express = require('express');
const {check} = require('express-validator')

const router = express.Router();
const HttpError = require('../../../core/common/http-error')
const FAKE_APPOINTMENTS = require('../FakeAppointments')
const appointmentsController = require('../controllers/appointments-controller')

router.get('/', appointmentsController.getAppointments);

router.get('/:id', appointmentsController.getAppointmentById);

const createUpdateValidators = [
    check('name').not().isEmpty(),
    check('date').not().isEmpty()
]

router.post(
    '/',
    createUpdateValidators,
    appointmentsController.createAppointment);

router.patch(
    '/:id',
    createUpdateValidators,
    appointmentsController.updateAppointment);

router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;