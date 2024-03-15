const bcrypt = require('bcrypt');
const TransportEmployeeModel = require('../../Admin/models/TransportEmployee');

const loginTransportEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user with the provided username exists
    const transportEmployee = await TransportEmployeeModel.findOne({ username });

    if (!transportEmployee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the account is active
    if (!transportEmployee.isActive) {
      return res.status(401).json({ message: 'Your account is not active. Please contact the administrator.' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, transportEmployee.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password is correct, send the userId in the response
    res.status(200).json({ message: 'Login successful', userId: transportEmployee._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { loginTransportEmployee };
