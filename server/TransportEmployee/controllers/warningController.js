// warningController.js

const Warning = require('../model/warning');
const DriversAttendance = require('../model/driversAttendance');
const { startOfWeek, endOfWeek } = require('date-fns');
const jwt = require('jsonwebtoken');

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

const getWarnings = async (req, res) => {
  try {
    const driverId = req.params.driverId; // Extract driverId from request parameters

    const userWarnings = await Warning.find({ driverId: driverId });

    if (!userWarnings) {
      return res.status(404).json({ error: 'No warnings found for this driver' });
    }

    return res.status(200).json(userWarnings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { sendWarning, getDriversToBeWarned, getWarnings};

















