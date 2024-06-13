// warningController.js

const Warning = require('../model/warning');
const DriversAttendance = require('../model/driversAttendance');
const TransportEmployee = require('../../Admin/models/TransportEmployee')
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

    console.log('Fetching warned drivers...');
    const warnedDrivers = await Warning.distinct('driverId', {
      date: { $gte: startOfCurrentWeek, $lte: endOfCurrentWeek }
    });

    console.log('Fetching drivers attendance...');
    const driversAttendance = await DriversAttendance.find({
      date: { $gte: startOfCurrentWeek, $lte: endOfCurrentWeek },
      overallStatus: 'Incomplete',
      driverId: { $nin: warnedDrivers } // Exclude drivers who have already been warned
    }).populate('driverId', 'firstName lastName licenseplate licensenumber');

    console.log('Filtering drivers with incomplete attendance for only a single day in the week...');
    const driverAttendanceMap = new Map();
    driversAttendance.forEach(record => {
      if (!driverAttendanceMap.has(record.driverId._id)) {
        driverAttendanceMap.set(record.driverId._id, []);
      }
      driverAttendanceMap.get(record.driverId._id).push(record);
    });

    const driversToBeWarned = [];
    driverAttendanceMap.forEach((attendanceRecords, driverId) => {
      if (attendanceRecords.length === 1) {
        driversToBeWarned.push(attendanceRecords[0]);
      }
    });

    console.log('Fetching assigned drivers...');
    const transportEmployees = await TransportEmployee.find().populate('assignedDrivers');

    console.log('Transport employees fetched:', transportEmployees.length);
    const assignedDriverIds = transportEmployees.flatMap(employee => {
      if (employee.assignedDrivers) {
        return employee.assignedDrivers.map(driver => driver._id.toString());
      } else {
        console.log(`Employee ${employee._id} has no assigned drivers`);
        return [];
      }
    });

    console.log('Filtering drivers to be warned...');
    const filteredDrivers = driversToBeWarned.filter(record => assignedDriverIds.includes(record.driverId._id.toString()));

    const formattedDriversData = filteredDrivers.map(record => ({
      driverId: record.driverId._id,
      driverName: `${record.driverId.firstName} ${record.driverId.lastName}`,
      licenseNumber: record.driverId.licensenumber,
      licensePlate: record.driverId.licenseplate,
      rounds: record.rounds
    }));

    res.json(formattedDriversData);
  } catch (error) {
    console.error('Error in getDriversToBeWarned:', error);
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

















