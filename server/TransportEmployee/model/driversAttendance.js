
const mongoose = require('mongoose');

const driversAttendanceSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  driverName: { type: String, required: true }, // Add driver's name field
  licenseNumber: { type: String, required: true }, // Add driver's license number field
  licensePlate: { type: String, required: true }, // Add driver's license plate field
  date: { type: Date, required: true },
  rounds: [{
    roundNumber: { type: Number, required: true },
    status: { type: String, enum: ['Complete', 'Incomplete'], required: true },
    time: { type: Date},
  }],
  overallStatus: { type: String, enum: ['Completed', 'Incomplete'], required: true },
  employeeId: { type: String, required: true },
  employeeFullName: { type: String, required: true }, // Add employee's full name field
});

const DriversAttendance = mongoose.model('DriversAttendance', driversAttendanceSchema);

module.exports = DriversAttendance;
