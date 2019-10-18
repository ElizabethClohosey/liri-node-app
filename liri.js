
  require("dotenv").config();

  var keys = require("./keys.js");
  // console.log("These are all my keys", keys);
  
  var axios = require("axios");
  var bandsintown = require("bandsintown-rest");
  // var omdb = require('omdb');
  
  // variable for user command (movie-this, conert-this, spotify-this, do-what-it-says)
  var command = process.argv[2];
  var userInput = process.argv[3];
  // imports the node-spotify-api NPM package
  var Spotify = require("node-spotify-api");

  // initializes the spotify API client using client id and secret
  var spotify = new Spotify(keys.spotify)  
  // console.log("Spotify keys", spotify);



  switch (command) {

    case "movie-this":

    // Request with axios to the OMDB API using userInput
    axios.get(`http://www.omdbapi.com/?t=${userInput};&y=&plot=short&apikey=${keys.omdb.key}`).then(
      function(response) {
        console.log(`The movie name is: ${response.data.Title}`);
        console.log(`The movie release year is: ${response.data.Year}`); 
        console.log(`The movie's IMBD rating is: ${ response.data.imdbRating}`);
        console.log(`The movie's Rotten Tomatoes rating is: ${response.data.Ratings[1].Value}`);
        console.log(`The movie's Country of origin is: ${response.data.Country}`);
        console.log(`The movie's language is: ${response.data.Language}`);
        console.log(`The movie's plot is: ${response.data.Plot}`);
        console.log(`The movie's cast is: ${response.data.Actors}`);
      }), function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        }
    break;

    case "concert-this":

    axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=${keys.bandsintown}`).then(
      function(response) {
        for (let i = 0; i < 4; i++) {
          console.log(`The name of venue is: ${response.data[i].venue.name}`);
          console.log(`The venue location is: ${response.data[i].venue.city}`);
          console.log(`The date of event: ${response.data[i].datetime}`);
        }
      }), function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
      }
    break;

    case "spotify-this-song":

        function songName (songName) { 
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
            // console.log(item);
            console.log(item.name);
            console.log(item.external_urls);
            console.log(item.album.artists[0].name);
            console.log(item.album.name);
          })
        });
      }  
      songName();

      break;
}


// =======================================================================

                      // to do 

    // bandsintown concert-this
       // - add moment to date 
    // spotify spotify-this-song
       // - check about preview link
    // add do-what-it-says
    // finish readme
        // add links
        // add photos, gifs or video

        // readme checklist 

    // 1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
    // 2. Give a high-level overview of how the app is organized
    // 3. Give start-to-finish instructions on how to run the app
    // 4. Include screenshots, gifs or videos of the app functioning
    // 5. Contain a link to a deployed version of the app
    // 6. Clearly list the technologies used in the app
    // 7. State your role in the app development

// ***************************************************************************

                  // Saved code for possible later use 

  //   function songName (songName) {
  //     spotify
  //     .search({ 
  //       type: 'track', 
  //       query: 'All the Small Things' 
  //     }).then(function(response) {
  //       console.log(response);
  //     }).catch(function(err) {
  //       console.log(`Error occurred: ${err}`);
  //     });

  //     data.tracks.items.map(item => {
  //       // console.log(item)
  //       console.log(item.name);
  //       console.log(item.external_urls);
  
  //     });
  // }

  // ?????????????????????????????????????????????????????????????????????????

                      // Questions 

    // is my track preview link ok?
  

