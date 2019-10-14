
  require("dotenv").config();

  var keys = require("./keys.js");
  // console.log("These are all my keys", keys);

  // imports the node-spotify-api NPM package
  var Spotify = require("node-spotify-api");

  // initializes the spotify API client using client id and secret
  var spotify = new Spotify(keys.spotify)  
  // console.log("Spotify keys", spotify);

  var axios = require("axios");
  var userInput = process.argv[2];

// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=defd7e02").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }), function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
  }








                        // Saved code for possible later use 

  // axios.get("http://www.bandsintown.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  // function(response) {
  //   console.log("The event data is: " + response.data.eventData);
  // }), function(err, data) {
  //     if (err) {
  //       return console.log('Error occurred: ' + err);
  //     }
  // }
  

//   function helpMe (songName) {
//     // spotify search (find this in spotify docs)
//   spotify.search({ 
//     type: 'track', 
//     query: 'All the small things', 
//   }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });
// }  
//   helpMe();