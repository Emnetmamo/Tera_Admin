// controllers/assignEmployeeController.js

const TaxiDrivers = require('../../Driver/model/drivermodel');
const TransportEmployees = require('../models/TransportEmployee');

//// for UnAssigned Drivers 
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


//// for Assigned Drivers 

// Fetch employees by city district excluding the currently assigned employee
const getEmployeeExceptCurrent = async (req, res) => {
  const { cityDistrict, currentEmployeeId } = req.query;

  try {
    const transportEmployees = await TransportEmployees.find({ cityDistrict, _id: { $ne: currentEmployeeId } });
    res.status(200).json(transportEmployees);
  } catch (error) {
    console.error('Error fetching transport employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/// Controller function for changing the assigned employee
const changeAssignedEmployee = async (req, res) => {
  try {
    const { driverId, employeeId, fullName, workId, cityDistrict, assignedRoute } = req.body;

    // Fetch driver and current employee from models
    const driver = await TaxiDrivers.findById(driverId);
    const currentEmployee = await TransportEmployees.findOne({ "assignedDrivers._id": driverId });
    const newEmployee = await TransportEmployees.findById(employeeId);

    // Check if the driver and employees exist
    if (!driver || !currentEmployee || !newEmployee) {
      return res.status(404).json({ message: 'Driver or employee not found' });
    }

    // Remove the driver from the current employee's assigned drivers list
    await TransportEmployees.updateOne(
      { _id: currentEmployee._id },
      { $pull: { assignedDrivers: { _id: driverId } } }
    );

    // Add the driver to the new employee's assigned drivers list
    const driverData = {
      _id: driverId,
      fullName: `${driver.firstName} ${driver.lastName}`,
      licensePlate: driver.licenseplate,
      licenseNumber: driver.licensenumber,
      cityDistrict: driver.cityDistrict,
      assignedRoute: driver.Assignedroute
    };
    newEmployee.assignedDrivers.push(driverData);

    // Update driver's assigned transport employee details
    driver.AssignedTransportEmployee = {
      _id: employeeId,
      fullName: fullName,
      employeeId: workId,
      cityDistrict: cityDistrict,
      assignedRoute: assignedRoute
    };

    // Save changes to the database
    await newEmployee.save();
    await driver.save();

    res.status(200).json({ message: 'Transport employee changed successfully' });
  } catch (error) {
    console.error('Error changing transport employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { 
  assignTransportEmployee, 
  getTransportEmployeesByCityDistrict, 
  getEmployeeExceptCurrent,
  changeAssignedEmployee};
