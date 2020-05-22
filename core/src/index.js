
/* core of application, used to create the games database */

/* requires */
const express = require('express')
const PORT = process.env.PORT || 8080
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

app.get('/core', (req, res) => {

  /* get last position searched */
  var last_pos_search = parseInt(req.query.pos) || 0

  /* get all steam apps */
  axios.get(`http://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${process.env.STEAM_KEY}&format=json`)
    .then(list_games => {
      /* process games list */
      process_info(list_games, last_pos_search)
        .then(result => res.send(filter_discount(result)))
    })
    .catch(error => console.log(error))
})

const filter_discount = (list_games) => {
  
  let array_return = []

  list_games.forEach(games_array => {
    for (let [key, game] of Object.entries(games_array))
      if (typeof(game.data) !== 'undefined')
        if (typeof(game.data.price_overview) !== 'undefined')
          if(game.data.price_overview.discount_percent == 100){
            
            /* save to database (see database.js file) */
            firebase.database().ref("freegames").set({[key]:game})
            array_return.push({[key]:game})

          }
  })

  return array_return

}

const process_info = (list_games, last_pos_search) => {

  let array_return = []
  let promises = []

  /* each loop has a new request (20 per system call - steam limit) */
  for(let i = 0; i < 20; i++){

      /* making the query */
      let data = make_query(list_games, last_pos_search)

      if(data){
        
        /* att last post searched */
        last_pos_search = data[1]
        /* fetching and add to array of promises */
        promises.push( axios.get(data[0]).then(result => result.data) )
      }
  }

  /* process all promises in array */
  return Promise.all(promises).then((responses)=>{
    for (let i = 0; i < responses.length; i++) {
        let response = responses[i]
        array_return.push(response)
      }
  }).then(() => array_return)

}

const make_query = (list_games, last_pos) => {

    /* query url */
    var query = ""

    /* max query is 600 id's (url length limit) */
    var max_pos = last_pos + 500

    /* loop to create query */
    for(last_pos; last_pos < max_pos & last_pos < list_games.data.applist.apps.length; last_pos++)
      query += list_games.data.applist.apps[last_pos].appid + ","

    if(query)
      /* return query and last position searched */
      return [`http://store.steampowered.com/api/appdetails?appids=${query}&cc=br&filters=price_overview`, last_pos]
    else return null
}

app.listen(PORT)
console.log(`Running on http://${HOST}:${PORT}`)
