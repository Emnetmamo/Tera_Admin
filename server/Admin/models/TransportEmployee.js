//models/TransportEmployee.js

const mongoose = require('mongoose');

const transportEmployeeSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  sex: String,
  phoneNumber: String,
  employeeId: { type: String, unique: true },
  address: String,
  cityDistrict: String,
  assignedRoute: String,
  username: { type: String, unique: true }, // randomly generated on the server side 
  password: String, // randomly generated on the server side
  photoUpload: { type: String, default: '' }, //to be filled by the supervisor later on
  assignedDrivers: { type: [String], default: [] }, // to be assigned by the admin 
  isActive: { type: Boolean, 
    default: true },
  
});

const TransportEmployee = mongoose.model('TransportEmployee', transportEmployeeSchema);

module.exports = TransportEmployee;
