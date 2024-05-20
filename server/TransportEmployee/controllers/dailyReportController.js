// controllers/dailyReportController.js

const TransportEmployee = require('../../Admin/models/TransportEmployee');
const DriversAttendance = require('../model/driversAttendance');
const Warning = require('../model/warning');
const Punishment = require('../model/punishment');
const DailyReport = require('../model/dailyReport');

// Get assigned drivers for a specific employee
const getAssignedDrivers = async (req, res) => {
  try {
    const { userId } = req.params;
    const employee = await TransportEmployee.findById(userId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const assignedDrivers = employee.assignedDrivers;
    res.status(200).json(assignedDrivers);
  } catch (error) {
    console.error('Error fetching assigned drivers:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get attendance record for a specific driver
const getAttendanceRecord = async (req, res) => {
  try {
    const { driverId } = req.params;
    const currentDate = new Date();
    // Fetch attendance record based on driverId and current date
    const attendanceRecord = await DriversAttendance.findOne({ driverId, date: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) } });
    res.status(200).json({ attendanceStatus: attendanceRecord ? attendanceRecord.overallStatus : 'Not available' });
  } catch (error) {
    console.error('Error fetching attendance record:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
// Get punishments sent for a specific driver
const getPunishmentsSent = async (req, res) => {
  try {
    const { driverId } = req.params;
    // Fetch punishments based on driverId and current date
    const currentDate = new Date();
    const punishments = await Punishment.find({ 
      driverId, 
      punishmentDate: { 
        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 
        $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) 
      } 
    });
    res.status(200).json(punishments);
  } catch (error) {
    console.error('Error fetching punishments:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
// Get warnings sent for a specific driver
const getWarningsSent = async (req, res) => {
  try {
    const { driverId } = req.params;
    // Fetch warnings based on driverId
    const warnings = await Warning.find({ driverId });
    res.status(200).json(warnings);
  } catch (error) {
    console.error('Error fetching warnings:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Route to submit a daily report
const submitDailyReport = async (req, res) => {
  try {
    const { driverId, attendanceStatus, punishmentsGiven, warningsSent } = req.body;
    
    const currentDate = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    const existingReport = await DailyReport.findOne({ driverId, date: currentDate });
    if (existingReport) {
      return res.status(400).json({ message: 'Report for today already submitted' });
    }

    const newReport = new DailyReport({
      driverId,
      attendanceStatus,
      punishmentsGiven,
      warningsSent,
      date: currentDate
    });
    await newReport.save();

    res.status(200).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error submitting daily report:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Check if there is a report sent for the day so there wont be duplicates later on
const checkReportExistence = async (req, res) => {
    try {
      const { driverId } = req.params;
      const currentDate = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
      const existingReport = await DailyReport.findOne({ driverId, date: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) } });
      res.status(200).json({ hasReportForToday: !!existingReport });
    } catch (error) {
      console.error('Error checking report existence:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
module.exports = {
  getAssignedDrivers,
  getAttendanceRecord,
  getPunishmentsSent,
  getWarningsSent,
  submitDailyReport,
  checkReportExistence
};
