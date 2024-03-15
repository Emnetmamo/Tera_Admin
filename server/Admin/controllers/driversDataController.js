// controllers/driversDataController.js

const TaxiDrivers = require('../../Driver/model/drivermodel');


// fetching all taxi drivers 
const getDrivers = async (req, res) => {
  try {
    const TaxiDriversData = await TaxiDrivers.find(); 
    res.json(TaxiDriversData);
  } catch (error) {
    console.error('Error fetching Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// fetching New drivers with no assigned Employee yet
const getNewDrivers = async (req, res) => {
  try {
    const NewTaxiDriversData = await TaxiDrivers.find({ "AssignedTransportEmployee.fullName": "Not Assigned" });
    res.json(NewTaxiDriversData);
  } catch (error) {
    console.error('Error fetching New Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getDrivers ,getNewDrivers};
