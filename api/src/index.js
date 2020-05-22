
/* requires */
const express = require('express')
const PORT = process.env.PORT || 8081
const app = express()
const firebase = require("firebase")

require("./database");

app.get('/api', (req, res) => {
  firebase.database().ref("freegames").once("value", snapshot => res.send(snapshot.val()))
})

app.listen(PORT)
