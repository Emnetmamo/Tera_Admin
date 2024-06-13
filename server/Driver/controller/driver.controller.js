const DriversAttendance = require('../../TransportEmployee/model/driversAttendance');
const UserServices = require('../services/driver.service');
const User = require("../model/drivermodel");

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);

        const { email, password, phone, firstName, lastName,username, code, licenseplate, licensenumber, Assignedroute, cityDistrict,Terminal, Address} = req.body;

        // Check for duplicate email
        const duplicateEmail = await User.findOne({ email: email });
        if (duplicateEmail) {
            return res.status(400).json({ success: false, message: `User with email ${email} already exists` });
        }

        // // Check for duplicate username
        // const duplicateUsername = await User.findOne({ username: username });
        // if (duplicateUsername) {
        //     return res.status(400).json({ success: false, message: `User with username ${username} already exists` });
        // }

        // Check for duplicate licenseplate
        const duplicateLicenseplate = await User.findOne({ licenseplate: licenseplate });
        if (duplicateLicenseplate) {
            return res.status(400).json({ success: false, message: `User with license plate ${licenseplate} already exists` });
        }

        await UserServices.registerUser(email, password, phone, firstName, lastName,username, code, licenseplate, licensenumber, Assignedroute, cityDistrict,Terminal, Address,);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.log("---> err -->", err);
        res.status(500).json({ success: false, message: err.message || 'Internal server error' });
    }
};



exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log('Login request body:', req.body); // Log the request body
        if (!username || !password) {
            throw new Error('Parameters are not correct');
        }
        let user = await UserServices.checkUser(username);
        if (!user) {
            throw new Error('User does not exist');
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new Error('Username or Password does not match');
        }
        let tokenData;
        tokenData = { _id: user._id, username: user.username };
    
        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")
        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        res.status(400).json({ status: false, message: error.message });
    }
}
