const router = require("express").Router();
const Complaintcontroller = require('../controller/complaintcontroller')

router.post("/sendComplaint",Complaintcontroller.createCompalaint);
router.get('/getComplaint',Complaintcontroller.getComplaint);
router.delete('/deleteComplaint',Complaintcontroller.deleteComplaint);


module.exports = router;