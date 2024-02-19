const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  firstName: String,
  fatherName: String,
  grandfatherName: String,
  email: { type: String, unique: true }, 
  phoneNumber: String,
  username: { type: String, unique: true }, 
  password: String,
  city: String,
  address: String,
  department: String,
  idUpload: String,
  photoUpload: String,
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
