const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Email format is not correct",
        ],
    },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Code: String,
    licenseplate: String,
    licensenumber:{type: String, required: true},
    Assignedroute: {type:String, required: true},
    cityDistrict: {type: String, required:true}, //named same as the one in the employee model
    Address: String,
    AssignedTransportEmployee: { // data of the assigned Employee
        type: {
            _id: String, 
            fullName: String, 
            employeeId: String, 
            cityDistrict: String, 
            assignedRoute: String 
        },
        default: {
            fullName: "Not Assigned",
            employeeId: "",
            cityDistrict: "",
            assignedRoute: ""
        }
    },
}, { timestamps: true });


driverSchema.plugin(uniqueValidator);

// Pre-save hook to hash the password before saving
driverSchema.pre("save", async function () {
    const driver = this;
    if (!driver.isModified("password")) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(driver.password, salt);
        driver.password = hash;
    } catch (error) {
        throw error;
    }
});

// Method to compare password during authentication
driverSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Driver', driverSchema);
