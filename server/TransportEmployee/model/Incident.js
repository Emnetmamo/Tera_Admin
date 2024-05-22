// Incident.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new mongoose.Schema({
    SentByEmployee: {
        type: Schema.Types.ObjectId,
        ref: 'TransportEmployee',
        required: true
      },
    licensePlate: {
        type: String,
        required: true
    },
    incidentType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Incident', incidentSchema);
