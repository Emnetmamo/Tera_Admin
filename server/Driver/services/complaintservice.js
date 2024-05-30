const ComplaintModel = require("../model/complaint");

class ComplaintService {
    static async createComplaint(userId, title, description) {
        const createComplaint = new ComplaintModel({ userId, title, description });
        return await createComplaint.save();
    }
    static async getComplaint(userId) {
        const complaintList = await ComplaintModel.find({ userId });
        return complaintList;
    }
    static async deleteComplaint(id) {
        const deleted = await ComplaintModel.findByIdAndDelete({ _id: id });
        return deleted;
    }
}

module.exports = ComplaintService;
