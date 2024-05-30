const ComplaintService = require('../services/complaintservice');
const ComplaintModel = require("../model/complaint");
exports.createComplaint = async (req, res, next) => {
    try {
        const { userId, title, desc } = req.body;
        let complaintData = await ComplaintService.createComplaint(userId, title, desc);
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
