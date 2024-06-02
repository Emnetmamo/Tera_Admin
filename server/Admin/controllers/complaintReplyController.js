// controllers/complaintReplyController.js

const TransportEmployeeComplaint = require('../../TransportEmployee/model/complaint');
const PassengerComplaint = require('../../Passenger/models/passengerComplaint');

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
    const replyDateTime = new Date(); // Get the current date/time

    const updatedComplaint = await TransportEmployeeComplaint.findByIdAndUpdate(
      complaintId,
      { reply: reply, replyDateTime: replyDateTime },
      { new: true } 
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



/// Passenger Complaints 


// fetching all compalints of Employees
const getPassengerComplaints = async (req, res) => {
  try {
    const Complaints = await PassengerComplaint.find()
    .sort({ postDateTime: -1 });

    if (Complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found from Passengers' });
    }
    res.json(Complaints);
  } catch (error) {
    console.error('Error fetching assenger Complaint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// sending a reply to the respective Passengers
const sendReplyForPassenger = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const reply = req.body.replyMessage;
    const replyDateTime = new Date(); // Get the current date/time

    const updatedComplaint = await PassengerComplaint.findByIdAndUpdate(
      complaintId,
      { reply: reply, respondedAt: replyDateTime },
      { new: true }
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
  sendReply,
  getPassengerComplaints,
  sendReplyForPassenger
};
