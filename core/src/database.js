
/* database configuration (google firebase) */

const firebase = require("firebase")

var config = {
    apiKey: "AIzaSyADkJ39pdHarUVSqoa0JgMjg4SRVI3SRGI",
    authDomain: "free-games-steam.firebaseapp.com",
    databaseURL: "https://free-games-steam.firebaseio.com",
    projectId: "free-games-steam",
    storageBucket: "free-games-steam.appspot.com",
    messagingSenderId: "736147612836",
    appId: "1:736147612836:web:bb0ea0652ccb1323093231",
    measurementId: "G-3XS85R0Q0D"
}

firebase.initializeApp(config)
module.exports = firebase;