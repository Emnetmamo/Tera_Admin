// controllers/punishmentController.js

const TransportEmployee = require('../../Admin/models/TransportEmployee');
const Punishment = require('../model/punishment');
const dotenv = require('dotenv');
dotenv.config();

// Get assigned drivers for a specific employee
const getDriversData = async (req, res) => {
  try {
    const { userId } = req.params;
    const employee = await TransportEmployee.findById(userId).populate('assignedDrivers');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const assignedDrivers = employee.assignedDrivers;
    res.status(200).json(assignedDrivers);
  } catch (error) {
    console.error('Error fetching drivers:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Punishment receit to be sent to a sepecific driver
const issuePunishment = async (req, res) => {
  try {
    const { driverId, driverName, licenseNumber,email, licensePlate, punishmentType, numberOfDays, fine } = req.body;

       // Find employee by employeeId to get name
       const employee = await TransportEmployee.findById(employeeId);

    // Data to be sent as a reciet
    const punishment = new Punishment({
      driverId,
      driverName,
      licenseNumber,
      email,
      licensePlate,
      punishmentType,
      numberOfDays,
      fine,
    });

    await punishment.save();

    res.status(201).json({ message: 'Punishment issued successfully' });
  } catch (error) {
    console.error('Error issuing punishment:', error.message);
    res.status(500).json({ error: 'Failed to issue punishment' });
  }
};

const getpunishments=async (req, res) => {
  try {
    const  driverId  = req.params.driverId;
    console.log("Driver Id: ", driverId);
    const punishments = await Punishment.find({ driverId: driverId});
    console.log(punishments);
    if (!punishments) {
      return res.status(404).json({ message: 'No punishments found for this driver' });
    }
    return res.status(200).json({punishments});
  } catch (error) {
    console.error('Error fetching punishments:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports ={ getDriversData,issuePunishment,getpunishments}