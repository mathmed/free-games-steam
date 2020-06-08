# free-games-steam
API with interface to view all games with 100 percent off Steam. Using **React**, **NodeJS** and **Firebase**.

## CORE
The CORE creates the database with the free games. In this project, it's used Firebase Database or JSON files to storage the games info.

### Configure
First of all, you need to get a [Steam API Key](https://steamcommunity.com/dev/apikey) to access their API.  
After you get your key, create a `.env` file inside `core/src` and set it, like in the below example  

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

### Run CORE

To populate the database or the JSON file, start the core server  
```html
$ node core/src/index.js
```
then make a **HTTP request** (the core server runs at port 8080)

```html
http://localhost:8080/core?pos=0&type=json
```

| Param        | Description           | Default  |
| ------------- |:-------------:| -----:|
| pos    | define 0 if you to want to search all the steam games or another number to search from it  | 0 |
| type     | define json to save the games in a json file or database to save in the firebase      |   json |

Run the CORE every day to keep your list of games update (you can use **crontab** to automate). 

## API

The API returns the games saved in the JSON file or in the database.

### Run API
First start the API server  
```html
$ node api/src/index.js
```
then make a **HTTP request*** (the api server runs at port 8081)

```html
http://localhost:8081/api
```
The API will look for the games in the JSON file first and if it's empty it will make a request to Firebase (configure `api/src/database.js` in this case).

## Interface

To start the interface, go to `front` folder and run

```html
$ npm start
```
the react server runs at port 3000

```html
http://localhost:3000
```