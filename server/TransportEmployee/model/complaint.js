// models/Complaint.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const transportEmployeeComplaintSchema = new Schema({
  transportEmployee: {
    type: Schema.Types.ObjectId,
    ref: 'TransportEmployee',
    required: true
  },
  complaint: {
    type: String,
    required: true
  },
  postDateTime: {
    type: Date,
    default: Date.now 
  },
  reply: {
    type: String,
    default: 'No reply has been sent!'
  }
});

const TransportEmployeeComplaint = mongoose.model('TransportEmployeeComplaint', transportEmployeeComplaintSchema);

module.exports = TransportEmployeeComplaint;

