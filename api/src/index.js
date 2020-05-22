
/* requires */
const express = require('express')
const PORT = process.env.PORT || 8081
const HOST = 'localhost'
const app = express()
const axios = require('axios')
const firebase = require("firebase")

var bodyParser = require('body-parser')
var cors = require('cors')
require("dotenv").config()
require("./database");


app.use(bodyParser.json())
app.use(cors({origin: '*'}))

app.get('/api', (req, res) => {

 
})

