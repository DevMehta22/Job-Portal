require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const CandidateRoutes = require('./Routes/CandidateRoutes')
const RecruiterRoutes = require("./Routes/RecruiterRoutes")
const CandidateFuncRoutes = require("./Routes/CandidateFuncRoutes")
const RecruiterFuncRoutes = require("./Routes/RecruiterFuncRoutes")
const authRoutes = require("./Routes/authRoutes")

const {syncModel} = require('./Models/models') 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/candidate',CandidateRoutes)
app.use('/api/candidatefunc',CandidateFuncRoutes)
app.use('/api/recruiter',RecruiterRoutes)
app.use('/api/recruiterfunc',RecruiterFuncRoutes)

app.use('/Uploads',express.static('./Uploads'))

const port = process.env.PORT || 5500

app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`server is running on port: ${port}`)
    syncModel()
})