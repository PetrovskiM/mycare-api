class AppointmentResponse {
  constructor (id, name, date, handledBy, estimatedDurationMinutes, conclusion, status, location) {
    this.id = id
    this.name = name
    this.date = date
    this.handledBy = handledBy
    this.estimatedDurationMinutes = estimatedDurationMinutes
    this.conclusion = conclusion
    this.status = status
    this.location = location
  }

  static create (appointment, location) {
    return new AppointmentResponse(
      appointment.id,
      appointment.name,
      appointment.date,
      appointment.handledBy,
      appointment.estimatedDurationMinutes,
      appointment.conclusion,
      appointment.status,
      location
    )
  }
}

module.exports = AppointmentResponse
