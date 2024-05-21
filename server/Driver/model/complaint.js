const UserModel = require("../model/drivermodel");
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps:true});

ComplaintSchema.plugin(uniqueValidator);

const ComplaintModel = mongoose.model('Complaint',ComplaintSchema);
module.exports = ComplaintModel;