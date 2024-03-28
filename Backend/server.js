require('dotenv').config()
const express = require('express')
const app = express()
const CandidateRoutes = require('./Routes/CandidateRoutes')
const RecruiterRoutes = require("./Routes/RecruiterRoutes")

const {syncModel} = require('./Models/models') 

app.use(express.json())
app.use('/api/candidate',CandidateRoutes)
app.use('/api/recruiter',RecruiterRoutes)

const port = process.env.PORT || 5500

app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`server is running on port: ${port}`)
    syncModel()
})