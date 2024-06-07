const router = require("express").Router();
const Complaintcontroller = require('../controller/complaintcontroller');

router.get('/getComplaint/:userId',Complaintcontroller.getComplaint);
router.delete('/deleteComplaint/:id',Complaintcontroller.deleteComplaint);
router.post("/sendComplaint", Complaintcontroller.createComplaint);
router.get('/getAllComplaints', Complaintcontroller.getAllComplaints);
router.post('/replyToComplaint/:id', Complaintcontroller.replyToComplaint);


module.exports = router;