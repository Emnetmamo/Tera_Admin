const { deleteComplaint } = require("../controller/complaintcontroller.js");
const ComplaintModel = require("../model/complaint");
class ComplaintService{
    static async createcomplaint(userId,title,description){
            const createcomplaint = new ComplaintModel({userId,title,description});
            return await createcomplaint.save();
    }
    static async getcomplaint(userId){
        const complaintList = await ComplaintModel.find({userId})
        return complaintList;
    }
    static async deleteComplaint(id){
        const deleted = await ToDoModel.findByIdAndDelete({_id:id})
        return deleted;
   }
   
}
module.exports = ComplaintService;