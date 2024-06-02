
const TaxiDrivers = require('../../Driver/model/drivermodel');


const getDrivers = async (req, res) => {
  try {
    const TaxiDriversData = await TaxiDrivers.find(); 
    res.json(TaxiDriversData);
  } catch (error) {
    console.error('Error fetching Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateDriverRouteAndDistrict = async (req, res) => {
  try {
    const { driverId, newRoute, newDistrict } = req.body;

    // Use findByIdAndUpdate to update only specific fields
    const updatedDriver = await TaxiDrivers.findByIdAndUpdate(
      driverId,
      {
        Assignedroute: newRoute,
        cityDistrict: newDistrict,
        AssignedTransportEmployee: {
          fullName: "Not Assigned",
          employeeId: "",
          cityDistrict: "",
          assignedRoute: ""
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver route and district updated successfully', updatedDriver });
  } catch (error) {
    console.error('Error updating driver route and district:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
module.exports ={getDrivers,updateDriverRouteAndDistrict};