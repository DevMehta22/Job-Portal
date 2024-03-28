const express = require('express')
const router = express.Router()

const {RegisterRecruiter,ListJob,getAllApplications,updateApplication} = require("../Controllers/RecruiterControllers")

router.get( '/applications/:listingid', getAllApplications) 
router.post('/register',RegisterRecruiter);
router.post('/list/:recruiterid', ListJob);
router.post('/updateApplication/:applicationid/:recruiterid',updateApplication)  

module.exports = router