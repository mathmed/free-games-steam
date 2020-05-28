
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

  /* get all steam apps */
  axios.get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${process.env.STEAM_KEY}&format=json`)
    
    .then(list_games => {
        /* process games list */
        process_info(list_games, last_pos_search)
        res.send("Request is done, the database is being populated. You can see the server LOG.")
    })

    .catch(error => console.log(error))
})


const process_info = (list_games, last_pos_search) => {

  /* each loop make a new request 
    500 games per request
    200 requests
    100000 games per system call
    steam have approximately 95k games
  */

  for(let i = 1; i <= 200; i++){

      /* making the query with 500 games */
      let data = make_query(list_games, last_pos_search)

      if(data){
        
        /* att last post searched */
        last_pos_search = data[1]

        /* doing the requests with interval to previne the steam ban :/ */
        setTimeout(() => fetch(data[0], data[1], i), (i*10)+i*1500)

      }
  }
}

const fetch = (query, games, i ) => {
  
  axios.get(query).then(result => {
    
    if(result.status == 200){
      
      console.log(`Success in get games between ${games} - ${games+500}, checking if exist a free game...`)
      
      for (let [key, game] of Object.entries(result.data))
        
        /* some verifications... */
        if (typeof(game.data) !== 'undefined')
          if (typeof(game.data.price_overview) !== 'undefined')

            /* only games with 100% discount (this can be changed to get more games) */
            if(game.data.price_overview.discount_percent == 100){

              /* receiving all informations about the free game */
              /* and save to database (FIREBASE in this case - configure in database.js file) */
              /* you can save the games where you want, ex: files, cache, another db... */   
              
              console.log("A game was discovered! Inserting into db...")
              axios.get(`https://store.steampowered.com/api/appdetails?appids=${key}&cc=br`)
                .then((result => firebase.database().ref("freegames").push(result.data)))
                .catch(() => console.log("Error inserting game in the database."))
          }

    /* retrying failed requests with interval to previne the steam ban :/ */
    /* if you get a lot of erros, you probably was banned, try again after 24 hours */

    } else {
      console.log(`Error in get games between ${games} - ${games+500}, retrying...`)
      setTimeout(() => fetch(query, games), (i*10)+i*2000)
    }
  
  })
  .catch(() => {
    console.log(`Error in get games between ${games} - ${games+500}, retrying...`)
    setTimeout(() => fetch(query, games), (i*10)+i*2000)
  })
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
