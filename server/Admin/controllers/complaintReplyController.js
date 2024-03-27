// controllers/complaintReplyController.js

const TransportEmployeeComplaint = require('../../TransportEmployee/model/complaint');

// fetching all compalints of Employees
const getAllComplaints = async (req, res) => {
  try {
    const Complaints = await TransportEmployeeComplaint.find()
    .sort({ postDateTime: -1 });

    if (Complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for Transport Employees' });
    }
    res.json(Complaints);
  } catch (error) {
    console.error('Error fetching Taxi Drivers Datas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// sending  a reply to the respective Employees
const sendReply = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const reply = req.body.replyMessage;

    const updatedComplaint = await TransportEmployeeComplaint.findByIdAndUpdate(
      complaintId,
      { reply: reply },
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Reply not sent' });
    }

    return res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllComplaints,
  sendReply
};
