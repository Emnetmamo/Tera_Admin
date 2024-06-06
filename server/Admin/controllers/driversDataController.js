// controllers/driversDataController.js
const TaxiDrivers = require('../../Driver/model/drivermodel');

// Fetch all taxi drivers
const getDrivers = async (req, res) => {
  try {
    const TaxiDriversData = await TaxiDrivers.find().populate('AssignedTransportEmployee');
    res.json(TaxiDriversData);
  } catch (error) {
    console.error('Error fetching Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch new drivers with no assigned employee yet
const getNewDrivers = async (req, res) => {
  try {
    const NewTaxiDriversData = await TaxiDrivers.find({ AssignedTransportEmployee: null }).populate('AssignedTransportEmployee');
    res.json(NewTaxiDriversData);
  } catch (error) {
    console.error('Error fetching New Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// For the table of AssignedList page
// fetching employee data from assigned drivers 
const getAssignedDrivers = async (req, res) => {
  try {
    const drivers = await TaxiDrivers.find({ AssignedTransportEmployee: { $ne: null } }).populate('AssignedTransportEmployee');
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getDrivers , getNewDrivers , getAssignedDrivers};
