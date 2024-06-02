const mongoose = require('mongoose');
const { Schema } = mongoose;

const PassengerComplaintSchema = new Schema({
    passenger: {
    type: Schema.Types.ObjectId,
    ref: 'Passenger',
    required: true
},
    plate: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: {
    type: Date,
    default: null,
  },
});

const Complaint = mongoose.model('PassengerComplaint', PassengerComplaintSchema);

module.exports = Complaint;
