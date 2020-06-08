# free-games-steam
API with interface to view all games with 100 percent off Steam

## CORE
The CORE creates the database with the free games. In this project, it's used Firebase Database or JSON files to storage the games info.

### Configure
First of all, you need to get a [Steam Key](https://steamcommunity.com/dev/apikey) to access their API.  
After you get your key, create a `.env` file inside `core/src`, like in the below example  

```html
STEAM_KEY=YOURKEY
```

#### Firebase
To store the games in the Firebase, you need to create a [Firebase Project](https://firebase.google.com/?hl=pt-br) and then to configure the `core/src/database.js` file with your credentials.  

```html
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
```

### Run

To populate the database or the JSON file, start the core server  
```html
$ node core/src/index.js
```
then make a http request (the server runs at port 8080)

```html
http://localhost:8080/core?pos=0&type=json
```

| Param        | Description           | Default  |
| ------------- |:-------------:| -----:|
| pos    | define 0 if you to want to search all the steam games or another number to search from it  | 0 |
| type     | define json to save the games in a json file or database to save in the firebase      |   json |


## API


## Front

