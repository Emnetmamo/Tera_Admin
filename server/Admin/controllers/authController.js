const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user with the provided username exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct compare hashed password and entered password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password is correct, consider the user authenticated
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { loginAdmin };
