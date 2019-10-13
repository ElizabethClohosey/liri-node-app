
  require("dotenv").config();

  var keys = require("./keys.js");
  // console.log("These are all my keys", keys);

  // imports the node-spotify-api NPM package
  var Spotify = require("node-spotify-api");

  // initializes the spotify API client using client id and secret
  var spotify = new Spotify(keys.spotify)  
  console.log("Spotify keys", spotify);

 