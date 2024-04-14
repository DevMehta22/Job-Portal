const express = require('express')
const router = express.Router()

const {ListJob,getJobsByID,getAllApplications,applicationDetails,updateApplication,deleteJob,updateJob,JobByListingID} = require("../Controllers/RecruiterFuncControllers")
const authMiddleware = require('../Middlewares/auth')

router.get( '/applications/:ListingID',authMiddleware, getAllApplications)
router.get('/application/details/:ApplicationID/:CandidateID',authMiddleware,applicationDetails) 

router.post('/list/:RecruiterID', authMiddleware,ListJob);
router.get('/jobs/:RecruiterID',authMiddleware,getJobsByID)

router.get('/job/:ListingID',authMiddleware,JobByListingID)
router.delete('/deletejob/:ListingID',authMiddleware,deleteJob)
router.put("/updatejob/:ListingID",authMiddleware ,updateJob)
router.put('/updateApplication/:ApplicationID/:RecruiterID',authMiddleware,updateApplication)  

module.exports = router 