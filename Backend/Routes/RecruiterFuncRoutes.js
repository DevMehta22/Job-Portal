const express = require('express')
const router = express.Router()

const {ListJob,getAllApplications,updateApplication} = require("../Controllers/RecruiterFuncControllers")

router.get( '/applications/:listingid', getAllApplications) 
router.post('/list/:recruiterid', ListJob);
router.post('/updateApplication/:applicationid/:recruiterid',updateApplication)  

module.exports = router