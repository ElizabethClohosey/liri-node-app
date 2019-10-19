
  require("dotenv").config();

  var keys = require("./keys.js");
  // console.log("These are all my keys", keys);
  
  var axios = require("axios");
  // var bandsintown = require("bandsintown-rest");
  // var omdb = require('omdb');
  var moment = require("moment");
  var fs = require("fs");

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
          var concertDate = moment(response.data[i].datetime);
          var formatedConcertDate = concertDate.format("MM/DD/YYYY");
          console.log(`The date of event: ${formatedConcertDate}`);
        }
      }), function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
      }
    break;

    case "spotify-this-song":

        function songName () { 
          if (userInput === undefined) {
            userInput = "The Sign"; //default Song
        }
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
            console.log(`Song name: ${item.name}`);
            console.log(`Artist name: ${item.album.artists[0].name}`);
            console.log(`Album name: ${item.album.name}`);
            console.log(`Song preview url: ${item.preview_url}`);
          })
        });
      }  
      songName();

      break;

      case "do-what-it-says":
      // console.log("Trying to fix what it says: ", command);
      // console.log("Trying to fix what it says: ", userInput);
        function randomText() {
          fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) {
              return console.log(err);
            }
            console.log(data);
          })
          
        }
        randomText();

      break;
  }
  
//====================================================================

                      // to do 

    // fix do-what-it-says
    // finish readme
        // 
        //video

  // ?????????????????????????????????????????????????????????????????????????

                      // Questions 

  // The sign by Ace of Base??? 

