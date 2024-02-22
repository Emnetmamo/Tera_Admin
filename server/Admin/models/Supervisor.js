//models/Supervisor.js

const mongoose = require('mongoose');

const SupervisorSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  sex: String,
  dateOfBirth: Date,
  phoneNumber: String,
  address: String,
  cityDistrict: String,
  assignedRoute: String,
  username: { type: String, unique: true },
  password: String,
});

const Supervisor = mongoose.model('Supervisor', SupervisorSchema);

module.exports = Supervisor;
