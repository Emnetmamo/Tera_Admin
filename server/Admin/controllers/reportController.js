const DailyReport = require('../../TransportEmployee/model/dailyReport');



// Controller to fetch all daily reports
const getAllDailyReports = async (req, res) => {
  try {
    // Fetch all reports from the database
    const reports = await DailyReport.find().populate('driverId').populate('reportedBy');
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching daily reports:', error.message);
    res.status(500).json({ error: 'Failed to fetch daily reports' });
  }
};


module.exports = {
  getAllDailyReports,
};

