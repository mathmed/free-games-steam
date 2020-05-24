
/* core of application, used to create the games database */

/* requires */
const express = require('express')
const PORT = process.env.PORT || 8080
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
  
  /* cleaning database in the first call */
  if(last_pos_search == 0)
    firebase.database().ref("freegames").remove()

  /* get all steam apps and process */
  axios.get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${process.env.STEAM_KEY}&format=json`)
    .then(list_games => {
      /* process games list */
      process_info(list_games, last_pos_search)
        .then(result => res.send(get_final_result(result)))
    })
    .catch(error => console.log(error))
})

const get_final_result = (list_games) => {

  let games_insert = [];
  
  list_games.forEach(games_array => {
    for (let [key, game] of Object.entries(games_array))
      if (typeof(game.data) !== 'undefined')
        if (typeof(game.data.price_overview) !== 'undefined')

          /* only games with 100% discount */
          if(game.data.price_overview.discount_percent == 100){

            /* receiving all informations about the free game */
            /* save to database (FIREBASE - see database.js file) */

            axios.get(`https://store.steampowered.com/api/appdetails?appids=${key}&cc=br`)
              .then((result) => {
                firebase.database().ref("freegames").push(result.data)
                games_insert.push(result.data)
              })
          }
  })

  return games_insert;
}

const process_info = (list_games, last_pos_search) => {

  let array_return = []
  let promises = []

  /* each loop make a new request 
    500 games per request
    20 request per system call
    10000 games per system call
    steam have aproapproximately 95k games
  */

  for(let i = 0; i < 5; i++){

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

    /* max query is 500 id's (url length limit) */
    var max_pos = last_pos + 500

    /* loop to create query */
    for(last_pos; last_pos < max_pos & last_pos < list_games.data.applist.apps.length; last_pos++)
      query += list_games.data.applist.apps[last_pos].appid + ","

    if(query)
      /* return query and last position searched */
      return [`https://store.steampowered.com/api/appdetails?appids=${query}&cc=br&filters=price_overview`, last_pos]
    else return null
}

app.listen(PORT)
