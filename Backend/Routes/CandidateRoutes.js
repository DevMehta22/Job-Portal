const express = require('express')
const router = express.Router()

const {RegisterCandidate,getAllCandidates,getACandidate,updateProfile,deleteProfile} = require("../Controllers/CandidateControllers")

router.get( '/getCandidates', getAllCandidates)
router.get('/getCandidates/:id',getACandidate)
router.post('/register',RegisterCandidate)
router.put('/update/:id',updateProfile)
router.delete('/delete/:id',deleteProfile)

module.exports = router