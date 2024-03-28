require('dotenv').config()
const express = require('express')
const app = express()

const {syncModel} = require('./Models/models') 

app.use(express.json())
const port = process.env.PORT || 5500

app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`server is running on port: ${port}`)
    syncModel()
})