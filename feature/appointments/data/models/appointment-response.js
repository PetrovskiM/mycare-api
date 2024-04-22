class AppointmentResponse {
  constructor (name, date, handledBy, estimatedDurationMinutes, conclusion, status, location) {
    this.name = name
    this.date = date
    this.handledBy = handledBy
    this.estimatedDurationMinutes = estimatedDurationMinutes
    this.conclusion = conclusion
    this.status = conclusion
    this.location = location
  }

  static create (appointment, location) {
    return new AppointmentResponse(
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
