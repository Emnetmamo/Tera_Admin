const ComplaintService = require('../services/complaintservice');

exports.createCompalaint =  async (req,res,next)=>{
    try {
        const { userId,title, desc } = req.body;
        let ComplaintData = await ComplaintService.createcomplaint(userId,title, desc);
        res.json({status: true,success:ComplaintData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
exports.getComplaint =  async (req,res,next)=>{
    try {
        const { userId } = req.body;
        let ComplaintData = await ComplaintService.getcomplaint(userId);
        res.json({status: true,success:ComplaintData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
exports.deleteComplaint =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await ComplaintService.deleteComplaint(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}