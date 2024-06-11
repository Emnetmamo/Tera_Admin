const ComplaintService = require('../services/complaintservice');
const ComplaintModel = require("../model/complaint");
exports.createComplaint = async (req, res, next) => {
    try {
        const { userId, subject, description } = req.body;
        let complaintData = await ComplaintService.createComplaint(userId, subject, description);
        res.json({ status: true, success: complaintData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getComplaint = async (req, res) => {
    try {
        const driverId = req.params.userId;
        const complaints = await ComplaintModel.find({ userId: driverId });

        if (!complaints) {
            return res.status(404).json({ status: false, message: 'No complaints found for the user' });
        }

        return res.status(200).json({ status: true, success: complaints });
    } catch (error) {
        console.error('Error fetching complaints:', error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.getAllComplaints = async (req, res, next) => {
    try {
        const complaints = await ComplaintModel.find()
            .populate('userId', 'firstName lastName email phone licenseplate'); // Populate specific fields from Driver model

        if (!complaints) {
            return res.status(400).json({ status: false, message: 'No complaints' });
        }
        res.status(200).json({ status: true, success: complaints });
    } catch (error) {
        console.error('error fetching all complaints:', error);
        res.status(500).json({ status: false, message: 'internal server error' });
    }
};

exports.replyToComplaint = async (req, res) => {
    try {
      const { id } = req.params;
      const { reply } = req.body;
  
      const complaint = await ComplaintModel.findByIdAndUpdate(
        id,
        { reply },
        { new: true }
      ).populate('userId'); // Ensure user information is populated
  
      if (!complaint) {
        return res.status(404).json({ status: false, message: 'Complaint not found' });
      }
  
      return res.status(200).json({ status: true, success: complaint });
    } catch (error) {
      console.error('Error replying to complaint:', error);
      return res.status(500).json({ status: false, message: 'Internal server error' });
    }
  };
exports.deleteComplaint = async (req, res, next) => {
    try {
        const { id } = req.params;
        let deletedData = await ComplaintService.deleteComplaint(id);
        res.json({ status: true, success: deletedData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};
