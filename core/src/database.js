
/* database configuration (google firebase) */

const firebase = require("firebase")

var config = {
}

firebase.initializeApp(config)
module.exports = firebase;