const router = require("express").Router();
const Complaintcontroller = require('../controller/complaintcontroller');

router.post("/sendComplaint",Complaintcontroller.createComplaint);
router.get('/getComplaint/:userId',Complaintcontroller.getComplaint);
router.delete('/deleteComplaint/:id',Complaintcontroller.deleteComplaint);


module.exports = router;