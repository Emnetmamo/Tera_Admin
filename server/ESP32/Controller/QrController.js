const DriversAttendance = require('../../TransportEmployee/model/driversAttendance');
const Driver = require('../../Driver/model/drivermodel'); 

const getDriverAttendanceByLicensePlate = async (req, res) => {
  try {
    const { licenseplate } = req.query;
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    // Find driver by license plate
    const driver = await Driver.findOne({ licenseplate: licenseplate });

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Find attendance records for the current day for the driver
    const attendanceRecords = await DriversAttendance.find({
      driverId: driver._id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).populate('driverId');

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for today' });
    }

    // Extract QR codes from rounds
    const qr = attendanceRecords.flatMap(record => record.rounds.map(round => round.qr));

    res.json({ qr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getDriverAttendanceByLicensePlate
};