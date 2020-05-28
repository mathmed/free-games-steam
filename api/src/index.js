
/* requires */
const _ = require("lodash")
const express = require('express')
const PORT = process.env.PORT || 8081
const app = express()
const firebase = require("firebase")
var cors = require('cors')

require("./database");

app.use(cors({origin: '*'}))

app.get('/api', (req, res) => {
  firebase.database().ref("freegames").once("value", snapshot => {
    let array_return = []
    _.map(snapshot.val(), (val, uid) => {
      array_return.push(val[Object.keys(val)].data)
    })
    res.send({games: array_return})
  })
  .catch(() => res.send({}))
})

app.listen(PORT)
