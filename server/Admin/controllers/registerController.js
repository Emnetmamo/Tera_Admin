const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// Logic for Admin registration //

const registerAdmin = async (req, res) => {
  try {
    const adminData = req.body;

    // Check if username already exists
    const existingUsername = await Admin.findOne({ username: adminData.username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await Admin.findOne({ email: adminData.email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    adminData.password = await bcrypt.hash(adminData.password, saltRounds);

    const newAdmin = new Admin(adminData);
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Logic for existing user checks //

const checkExistingUser = async (req, res) => {
  try {
    const { field, value } = req.query;
    const existingUser = await Admin.findOne({ [field]: value });

    res.json({ exists: !!existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerAdmin, checkExistingUser };
