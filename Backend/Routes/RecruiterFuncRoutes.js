const express = require('express')
const router = express.Router()

const {ListJob,getAllApplications,applicationDetails,updateApplication} = require("../Controllers/RecruiterFuncControllers")
const authMiddleware = require('../Middlewares/auth')

router.get( '/applications/:ListingID',authMiddleware, getAllApplications)
router.get('/application/details/:ApplicationID/:CandidateID',authMiddleware,applicationDetails) 
router.post('/list/:RecruiterID', authMiddleware,ListJob);
router.put('/updateApplication/:ApplicationID/:RecruiterID',authMiddleware,updateApplication)  

module.exports = router