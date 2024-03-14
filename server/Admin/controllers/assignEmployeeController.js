const TaxiDrivers = require('../../Driver/model/drivermodel');
const TransportEmployees = require('../models/TransportEmployee');

const getTransportEmployees = async (req, res) => {
  try {
    const transportEmployees = await TransportEmployees.find();
    res.status(200).json(transportEmployees);
  } catch (error) {
    console.error('Error fetching transport employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//// still In workings progress
const assignTransportEmployee = async (req, res) => {
  try {
    const { driverId, employeeId } = req.body;

    // Fetch driver and employee details
    const driver = await TaxiDrivers.findById(driverId);
    const employee = await TransportEmployees.findById(employeeId);

    // Check if both driver and employee exist
    if (!driver || !employee) {
      return res.status(404).json({ message: 'Driver or employee not found' });
    }

    // Assign employee to driver and vice versa
    driver.AssignedTransportEmployee = employee.fullName;
    employee.assignedDrivers = `${driver.firstName} ${driver.lastName}`;

    // Save changes to database
    await driver.save();
    await employee.save();

    res.status(200).json({ message: 'Employee assigned to driver successfully' });
  } catch (error) {
    console.error('Error assigning employee to driver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { assignTransportEmployee, getTransportEmployees };
