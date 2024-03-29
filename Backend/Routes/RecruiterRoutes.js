const express = require('express')
const router = express.Router()

const {RegisterRecruiter,getARecruiter,updateRecruiter,deleteRecruiter} = require("../Controllers/RecruiterControllers")

router.get( '/:id', getARecruiter) 
router.post('/register',RegisterRecruiter);
router.put('/update/:id', updateRecruiter);
router.delete('/delete/:id',deleteRecruiter);  

module.exports = router