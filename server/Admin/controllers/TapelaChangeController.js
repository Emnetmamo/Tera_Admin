const TaxiDrivers = require('../../Driver/model/drivermodel');
const Employee = require('../../Admin/models/TransportEmployee');

const getDrivers = async (req, res) => {
  try {
    const drivers = await TaxiDrivers.find().populate('AssignedTransportEmployee', 'fullName');
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching Taxi Drivers Data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateDriverTerminalAndRoute = async (req, res) => {
  try {
    const { driverId, newRoute, newTerminal, newEmployeeId } = req.body;

    // Find the driver
    const driver = await TaxiDrivers.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // If there's a currently assigned employee, remove the driver from their assignedDrivers list
    if (driver.AssignedTransportEmployee) {
      const currentEmployee = await Employee.findById(driver.AssignedTransportEmployee);
      if (currentEmployee && Array.isArray(currentEmployee.assignedDrivers)) {
        currentEmployee.assignedDrivers.pull(driver._id);
        await currentEmployee.save();
      }
    }

    // Update driver details
    driver.Assignedroute = newRoute;
    driver.Terminal = newTerminal;
    driver.AssignedTransportEmployee = newEmployeeId || null;

    await driver.save();

    // If a new employee is assigned, add the driver to their assignedDrivers list
    if (newEmployeeId) {
      const newEmployee = await Employee.findById(newEmployeeId);
      if (!newEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      if (!Array.isArray(newEmployee.assignedDrivers)) {
        newEmployee.assignedDrivers = [];
      }
      newEmployee.assignedDrivers.push(driver._id);
      await newEmployee.save();
    }

    res.status(200).json({ message: 'Driver terminal and route updated successfully', driver });
  } catch (error) {
    console.error('Error updating driver terminal and route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// fetch employees in the same terminal as the Driver 
const getEmployeesByTerminal = async (req, res) => {
  const { terminal } = req.query;

  try {
    const employees = await Employee.find({ Terminal: terminal });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getDrivers,
  updateDriverTerminalAndRoute,
  getEmployeesByTerminal
};
