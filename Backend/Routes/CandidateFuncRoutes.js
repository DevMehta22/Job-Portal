const express = require('express')
const router = express.Router()

const {ViewJobs,ApplyForJob} = require("../Controllers/CandidateFuncControllers")

router.get( '/jobs', ViewJobs) // Get all jobs from the database and send them to the client side
router.post('/apply/:candidateid/:listingid', ApplyForJob);  // A candidate applies for a job by sending their id and the listing

module.exports = router