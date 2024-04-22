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
}

module.exports = AppointmentResponse
