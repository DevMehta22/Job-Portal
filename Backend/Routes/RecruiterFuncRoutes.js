const express = require('express')
const router = express.Router()

const {ListJob,getAllApplications,updateApplication} = require("../Controllers/RecruiterFuncControllers")

router.get( '/applications/:ListingID', getAllApplications) 
router.post('/list/:RecruiterID', ListJob);
router.put('/updateApplication/:ApplicationID/:RecruiterID',updateApplication)  

module.exports = router