
/* requires */
const _ = require("lodash")
const express = require('express')
const PORT = process.env.PORT || 8081
const app = express()
const firebase = require("firebase")
var cors = require('cors')

/* it is possible to get games from firebase or from a json file */
require("./database")
const fs = require("fs")

app.use(cors({origin: '*'}))

app.get('/api', (req, res) => {

  /* verify if JSON file is populated */
  fs.readFile("../../core/src/games.json", (err_read, data) => {
    data = JSON.parse(data)
    if(data && data.games && data.games.length > 0 ){
      res.send(data)
    
    /* if not, doing a firebase request */
    }else{
      firebase.database().ref("freegames").once("value", snapshot => {
        let array_return = []
        _.map(snapshot.val(), (val, uid) => {
          array_return.push(val[Object.keys(val)].data)
        })
        res.send({games: array_return})
      })
      .catch(() => res.send({}))
    }
  })
})

app.listen(PORT)
