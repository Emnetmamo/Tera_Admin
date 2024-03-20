// controllers/employeeDataController.js

const TransportEmployees = require('../models/TransportEmployee');


// fetching all treansport employees 
const getTransportEmployees = async (req, res) => {
  try {
    const TransportEmployeesData = await TransportEmployees.find(); 
    res.json(TransportEmployeesData);
  } catch (error) {
    console.error('Error fetching Transport Employees Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {getTransportEmployees};