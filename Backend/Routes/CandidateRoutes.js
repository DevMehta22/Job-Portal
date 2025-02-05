const express = require('express')
const router = express.Router()

const {RegisterCandidate,getAllCandidates,getACandidate,isCandidateExists,updateProfile,deleteProfile} = require("../Controllers/CandidateControllers")

router.get( '/getcandidates', getAllCandidates)
router.get('/getcandidate/:id',getACandidate)
router.get('/isexists/:UserID',isCandidateExists)
router.post('/register/:UserID',RegisterCandidate)
router.put('/update/:id',updateProfile)
router.delete('/delete/:id',deleteProfile)

module.exports = router