const WebSocket = require('ws');
const mongoose = require('mongoose');
const DriversAttendance = require('../model/driversAttendance');
const TransportEmployee = require('../../Admin/models/TransportEmployee');

const wss = new WebSocket.Server({ port: 8080 });

const broadcast = (message) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

// Get Employee Terminal info
const getEmployeeTerminal = async (req, res) => {
  try {
    const { userId } = req.params;
    const employee = await TransportEmployee.findOne({ _id: userId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ terminal: employee.Terminal });
  } catch (error) {
    console.error('Error fetching employee terminal:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get assigned drivers for a specific employee
const getAssignedDrivers = async (req, res) => {
  try {
    const { userId } = req.params;
    const employee = await TransportEmployee.findById(userId).populate('assignedDrivers');
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

// Get attendance data for the current day
const getAttendanceData = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date(); // Current date
    const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Start of today (midnight)
    const endOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1); // End of today (midnight of the next day)
      
    // search the database for all attendance data for the current day
    const attendanceData = await DriversAttendance.find({ employeeId: userId, date: { $gte: startOfToday, $lt: endOfToday } });
  
    // If there's no attendance data found for the current day, return an empty array
    if (!attendanceData || attendanceData.length === 0) {
      return res.status(200).json([]);
    }
  
    res.status(200).json(attendanceData); // Return all attendance data for the current day
  } catch (error) {
    console.error('Error fetching attendance data:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postDriversAttendance = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { driverId, employeeId, qr } = req.body;
    // Check if attendance data already exists for the driver for the current day
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    const existingAttendance = await DriversAttendance.findOne({
      driverId,
      date: { $gte: startOfToday, $lt: endOfToday }
    });

    // If attendance data already exists, return an error
    if (existingAttendance) {
      return res.status(400).json({ error: 'Attendance already marked for this driver today' });
    }

    // Create new attendance document with QR codes
    const rounds = Array.from({ length: 8 }, (_, index) => ({
      roundNumber: index + 1,
      status: 'Incomplete',
      time: null,
      qr: qr[index], // Set the QR code from the request body
    }));

    // Create new attendance document
    const attendance = new DriversAttendance({
      driverId,
      employeeId,
      date: new Date(),
      rounds,
      overallStatus: 'Incomplete',
    });
    // Save the new attendance record
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error marking attendance:', error.message);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

const updateDriversAttendance = async (req, res) => {
  try {
    const { driverId } = req.params; // Extract driverId from params
    const { roundIndex } = req.body; // Extract roundIndex from the request body

    // Find the attendance record for the driver and the current date
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    let attendance = await DriversAttendance.findOne({ driverId, date: { $gte: startOfToday, $lt: endOfToday } });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    // Check if the round has already been marked as complete
    if (attendance.rounds[roundIndex].status === 'Complete') {
      return res.status(400).json({ error: 'This round has already been completed' });
    }

    // Check the time difference between the current round and the last completed round
    const lastCompletedRound = attendance.rounds.reduce((last, round, index) => {
      if (round.status === 'Complete') return { ...last, index, time: new Date(round.time) };
      return last;
    }, { index: -1, time: null });

    const now = new Date();

    if (lastCompletedRound.time && ((now - lastCompletedRound.time) / (1000 * 60)) < 1) {
      return res.status(429).json({ error: 'You must wait at least 1 minute between marking rounds' });
    }

    // Update the status and time of the clicked round
    attendance.rounds[roundIndex].status = 'Complete';
    attendance.rounds[roundIndex].time = new Date().toISOString();

    // Update overall status
    const allRoundsComplete = attendance.rounds.every(round => round.status === 'Complete');
    attendance.overallStatus = allRoundsComplete ? 'Completed' : 'Incomplete';

    // Save the updated attendance record
    await attendance.save();

    // Broadcast the update to all connected WebSocket clients
    broadcast({ driverId, roundIndex, status: 'Complete' });

    return res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error.message);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};

const getDriverAttendanceHistory = async (req, res) => {
  try {
    const { driverId } = req.params;
    const attendanceHistory = await DriversAttendance.find({ driverId }).sort({ date: -1 });
    res.status(200).json(attendanceHistory);
  } catch (error) {
    console.error('Error fetching driver attendance history:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getEmployeeTerminal,
  getAssignedDrivers,
  getAttendanceData,
  postDriversAttendance,
  updateDriversAttendance,
  getDriverAttendanceHistory,
};

