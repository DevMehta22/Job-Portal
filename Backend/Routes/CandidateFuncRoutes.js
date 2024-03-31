const express = require('express')
const router = express.Router()
const {ViewJobs,ApplyForJob} = require("../Controllers/CandidateFuncControllers")
const {upload} = require("../upload")


router.get( '/jobs', ViewJobs) 
router.post('/apply/:CandidateID/:ListingID',upload, ApplyForJob)

module.exports = router