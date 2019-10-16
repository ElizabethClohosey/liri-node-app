
  require("dotenv").config();

  var keys = require("./keys.js");
  // console.log("These are all my keys", keys);

  // imports the node-spotify-api NPM package
  var Spotify = require("node-spotify-api");

  // initializes the spotify API client using client id and secret
  var spotify = new Spotify(keys.spotify)  
  // console.log("Spotify keys", spotify);

  var axios = require("axios");
  var bandsintown = require("bandsintown-rest");

  var command = process.argv[2];
  var userInput = process.argv[3];


// Request with axios to the OMDB API with the movie specified
switch (command) {

  case "movie-this":

axios.get("http://www.omdbapi.com/?t=" + userInput + ";&y=&plot=short&apikey=defd7e02").then(
  function(response) {
    console.log("The movie's name is: " + response.data.Title);
    console.log("The movie's release year is: " + response.data.Year);
    console.log("The movie's imbd rating is: " + response.data.imdbRating);
    // console.log("The movie's Rotten Tomatoes rating is: " + response.data.);
    console.log("The movie's Country of origin is: " + response.data.Country);
    console.log("The movie's language is: " + response.data.Language);
    console.log("The movie's plot is: " + response.data.Plot);
    console.log("The movie's cast is: " + response.data.Actors);
  }), function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    }
    break;

    case "concert-this":

    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
      function(response) {
        for (let i = 0; i < 4; i++) {
          console.log("The name of venue is " + response.data[i].venue.name);
          console.log("The venue location is " + response.data[i].venue.city);
          console.log("The date of event " + response.data[i].venue.datetime);
        }
      }), function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
      }
    break;

    case "spotify-this-song":

        function helpMe (songName) { 
          // console.log(userInput, "user Input")
        // spotify search (find this in spotify docs)
        spotify.search({ 
          type: 'track', 
          query: userInput, 
          limit: 3,
        }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
        
          // console.log(data); 
          data.tracks.items.map(item => {
            // console.log(item)
            // console.log(item.album.artists.external_urls.name);
            // console.log(item.album);
      
            // These console logs work 
            console.log(item.name);
            console.log(item.external_urls);
      
          })
        });
      }  
      helpMe();

      break;
}











            // Saved code for possible later use 
                        

  

