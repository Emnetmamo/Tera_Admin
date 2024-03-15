// controllers/assignEmployeeController.js

const TaxiDrivers = require('../../Driver/model/drivermodel');
const TransportEmployees = require('../models/TransportEmployee');

    // Fetch  employee by their city district 
const getTransportEmployeesByCityDistrict = async (req, res) => {
  const { cityDistrict } = req.query;

  try {
    const transportEmployees = await TransportEmployees.find({ cityDistrict });
    res.status(200).json(transportEmployees);
  } catch (error) {
    console.error('Error fetching transport employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const assignTransportEmployee = async (req, res) => {
  try {
    const { driverId, employeeId, fullName, workId, cityDistrict, assignedRoute } = req.body;

    // Fetch driver and employee using  models
    const driver = await TaxiDrivers.findById(driverId);
    const employee = await TransportEmployees.findById(employeeId);


    // Check if the driver and employee exist
    if (!driver || !employee) {
      return res.status(404).json({ message: 'Driver or employee not found' });
    }

    // Update driver's assigned transport employee details
    
    driver.AssignedTransportEmployee = {
      _id: employeeId,
      fullName: fullName,
      employeeId: workId,
      cityDistrict: cityDistrict,
      assignedRoute: assignedRoute
    };

    // Update employee's assigned drivers list
    const driverData = {
      _id: driverId,
      fullName: `${driver.firstName} ${driver.lastName}`,
      licensePlate: driver.licenseplate,
      licenseNumber: driver.licensenumber,
      cityDistrict: driver.cityDistrict,
      assignedRoute: driver.Assignedroute
    };
    employee.assignedDrivers.push(driverData);

    // Save changes to the database
    await driver.save();
    await employee.save();

    res.status(200).json({ message: 'Driver assigned to employee successfully' });
  } catch (error) {
    console.error('Error assigning driver to employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { assignTransportEmployee, getTransportEmployeesByCityDistrict };
