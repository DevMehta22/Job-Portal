const express = require('express')
const router = express.Router()

const {RegisterCandidate,ViewJobs,ApplyForJob} = require("../Controllers/CandidateControllers")

router.get( '/jobs', ViewJobs) // Get all jobs from the database and send them to the client side
router.post('/register',RegisterCandidate);
router.post('/apply/:candidateid/:listingid', ApplyForJob);  // A candidate applies for a job by sending their id and the listing

module.exports = router