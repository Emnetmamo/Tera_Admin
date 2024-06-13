const PassengerComplaint = require('../models/passengerComplaint');

const fileComplaint = async (req, res) => {
  try {
    const {userId, plate, type, description } = req.body;


    const newPassengerComplaint = new PassengerComplaint({
      passenger: userId,
      plate,
      type,
      description,
    });

    await newPassengerComplaint.save();

    res.status(201).json({ message: 'Complaint filed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getComplaints = async (req, res) => {
  try {
    const { passengerId } = req.query;
    const complaints = await PassengerComplaint.find({ passenger: passengerId }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  fileComplaint,
  getComplaints,
};
