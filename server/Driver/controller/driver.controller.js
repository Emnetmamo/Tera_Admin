const UserServices = require('../services/driver.service');

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, phone, firstName, lastName ,license} = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            return res.status(400).json({ success: false, message: `User with email ${email} already exists` });
        }
        await UserServices.registerUser(email, password, phone, firstName, lastName, license);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.log("---> err -->", err);
        res.status(500).json({ success: false, message: err.message || 'Internal server error' });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }
        const token = await UserServices.generateAccessToken({ _id: user._id, email: user.email });
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.log(error, 'err---->');
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
}
