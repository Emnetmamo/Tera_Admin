// controllers/attendanceController.js

const TransportEmployee = require('../../Admin/models/TransportEmployee');
const DriversAttendance = require('../model/driversAttendance');

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


// Post driver's attendance data
const postDriversAttendance = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { driverId, driverName, licenseNumber, licensePlate, employeeId, rounds } = req.body;

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

    // Find employee by employeeId
    const employee = await TransportEmployee.findById(employeeId);

    // Create new attendance document
    const attendance = new DriversAttendance({
      driverId,
      driverName,
      licenseNumber,
      licensePlate,
      date: new Date(),
      rounds,
      overallStatus: 'Incomplete',
      employeeId,
      employeeFullName: employee.fullName,
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

// Update driver's attendance data
const updateDriversAttendance = async (req, res) => {
  try {
    const { driverId } = req.params; // Extract driverId from params
    const { roundIndex, postRoundIndex } = req.body; // Extract roundIndex and postRoundIndex from the request body

    // Find the attendance record for the driver and the current date
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    let attendance = await DriversAttendance.findOne({ driverId, date: { $gte: startOfToday, $lt: endOfToday } });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    // Check if the roundIndex is greater than the postRoundIndex
    if (roundIndex <= postRoundIndex) {
      return res.status(400).json({ error: 'Cannot update this round, the time is already up!' });
    }

    // Update the status and time of the clicked round
    attendance.rounds[roundIndex].status = 'Complete';
    attendance.rounds[roundIndex].time = new Date().toISOString();

    // Update overall status
    const allRoundsComplete = attendance.rounds.every(round => round.status === 'Complete');
    attendance.overallStatus = allRoundsComplete ? 'Completed' : 'Incomplete';

    // Save the updated attendance record
    await attendance.save();

    return res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error.message);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};


module.exports = {
  getAssignedDrivers,
  getAttendanceData,
  postDriversAttendance,
  updateDriversAttendance,
};