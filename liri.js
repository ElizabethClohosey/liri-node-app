
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








                        // Saved code for possible later use 

  // axios.get("http://www.bandsintown.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  // function(response) {
  //   console.log("The event data is: " + response.data.eventData);
  // }), function(err, data) {
  //     if (err) {
  //       return console.log('Error occurred: ' + err);
  //     }
  // }
  

