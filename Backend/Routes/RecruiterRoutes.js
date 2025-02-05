const express = require('express')
const router = express.Router()

const {RegisterRecruiter,getRecruiters,getARecruiter,isRecruiterExists,updateRecruiter,deleteRecruiter} = require("../Controllers/RecruiterControllers")

router.get('/',getRecruiters)
router.get( '/:id', getARecruiter) 
router.get('/isexists/:UserID',isRecruiterExists)
router.post('/register/:UserID',RegisterRecruiter);
router.put('/update/:id', updateRecruiter);
router.delete('/delete/:id',deleteRecruiter);  

module.exports = router