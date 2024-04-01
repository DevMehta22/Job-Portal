const {signup,login} = require('../Controllers/UserControllers')
const express = require('express')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

module.exports = router
