// warningController.js

const Warning = require('../model/warning');
const DriversAttendance = require('../model/driversAttendance');
const { startOfWeek, endOfWeek } = require('date-fns');

const sendWarning = async (req, res) => {
  try {
    const { driverId, driverName, licenseNumber, licensePlate, incompleteRounds } = req.body;
    // message for the driver containing data of their attendace for the day
    const message = `Dear ${driverName}, you didn't complete your rounds for the day. 
                     Incomplete rounds: ${incompleteRounds.join(', ')}`;

    const warning = new Warning({
      driverId,
      driverName,
      licenseNumber,
      licensePlate,
      message
    });

    await warning.save();

    res.status(201).json({ message: 'Warning sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch those drivers with incomplete attendance only for a day in a week
const getDriversToBeWarned = async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    const warnedDrivers = await Warning.distinct('driverId', {
      date: { $gte: startOfCurrentWeek, $lte: endOfCurrentWeek }
    });

    const driversAttendance = await DriversAttendance.find({
      date: { $gte: startOfCurrentWeek, $lte: endOfCurrentWeek },
      overallStatus: 'Incomplete',
      driverId: { $nin: warnedDrivers } // Exclude drivers who have already been warned
    });

    res.json(driversAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendWarning, getDriversToBeWarned };

















