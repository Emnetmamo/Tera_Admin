// controllers/complaintController.js

const TransportEmployeeComplaint = require('../model/complaint');
const TransportEmployee = require('../../Admin/models/TransportEmployee');

//Handles complaints submission
const submitComplaint = async (req, res) => {
  try {
    const { userId, complaint } = req.body;
    
    // Fetch the TransportEmployee data associated with the userId
    const transportEmployee = await TransportEmployee.findById(userId);

    if (!transportEmployee) {
      return res.status(404).json({ message: 'Transport employee not found' });
    }

    // Create new complaint
    const newComplaint = new TransportEmployeeComplaint({
      transportEmployee: transportEmployee._id,
      complaint
    });

    // Save the complaint to the database
    await newComplaint.save();

    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ message: 'Failed to submit complaint' });
  }
};

// Get alm the complaints by the Employee to display in the front end cards
const getAllComplaints = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all complaints associated with the provided userId and sort them by postDateTime in descending order
    const complaints = await TransportEmployeeComplaint.find({ transportEmployee: userId })
      .sort({ postDateTime: -1 });

    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this user' });
    }

    res.status(200).json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};

module.exports = {
  submitComplaint,
  getAllComplaints
};
