//models/TransportEmployee.js

const mongoose = require('mongoose');

const transportEmployeeSchema = new mongoose.Schema({
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

const TransportEmployee = mongoose.model('TransportEmployee', transportEmployeeSchema);

module.exports = TransportEmployee;
