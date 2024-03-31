const express = require('express')
const router = express.Router()

const {RegisterCandidate,getAllCandidates,getACandidate,updateProfile,deleteProfile} = require("../Controllers/CandidateControllers")

router.get( '/getcandidates', getAllCandidates)
router.get('/getcandidate/:id',getACandidate)
router.post('/register',RegisterCandidate)
router.put('/update/:id',updateProfile)
router.delete('/delete/:id',deleteProfile)

module.exports = router