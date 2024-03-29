const express = require('express')
const router = express.Router()

const {ViewJobs,ApplyForJob} = require("../Controllers/CandidateFuncControllers")

router.get( '/jobs', ViewJobs) 
router.post('/apply/:candidateid/:listingid', ApplyForJob)

module.exports = router