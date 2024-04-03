const express = require('express')
const router = express.Router()

const {RegisterRecruiter,getRecruiters,getARecruiter,updateRecruiter,deleteRecruiter} = require("../Controllers/RecruiterControllers")

router.get('/',getRecruiters)
router.get( '/:id', getARecruiter) 
router.post('/register',RegisterRecruiter);
router.put('/update/:id', updateRecruiter);
router.delete('/delete/:id',deleteRecruiter);  

module.exports = router