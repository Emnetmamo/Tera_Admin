const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Driver = require('./drivermodel');
const ComplaintSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: Driver.modelName, 
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reply: {
        type: String
    }
}, { timestamps: true });

ComplaintSchema.plugin(uniqueValidator);

const ComplaintModel = mongoose.model('Complaint', ComplaintSchema);
module.exports = ComplaintModel;
