
  require("dotenv").config();

  var keys = require("./keys.js");
  var axios = require("axios");
  var moment = require("moment");
  var fs = require("fs");
  var Spotify = require("node-spotify-api");

  // variable for user command (movie-this, conert-this, spotify-this, do-what-it-says) and user search input
  var command = process.argv[2];
  var userInput = process.argv[3];
  
  // initializes the spotify API client using client id and secret
  var spotify = new Spotify(keys.spotify)  

  function runSwitch (command, userInput) {
    switch (command) {

      case "movie-this":

      // Request with axios to the OMDB API using userInput
      axios.get(`http://www.omdbapi.com/?t=${userInput};&y=&plot=short&apikey=${keys.omdb.key}`).then(
        function(response) {
          // console.log(`\n`);
          console.log(`\n************ Start Movie Results ************\n`)
          // console.log(`Movie name is: ${response.data.Title}\n \nMovie release year is: ${response.data.Year}`);
          console.log(`Movie name: ${response.data.Title}`);
          console.log(`Release year: ${response.data.Year}`); 
          console.log(`IMBD rating: ${ response.data.imdbRating}`);
          console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
          console.log(`Country of origin: ${response.data.Country}`);
          console.log(`Language: ${response.data.Language}`);
          console.log(`Plot: ${response.data.Plot}`);
          console.log(`Cast: ${response.data.Actors}\n`);
          console.log(`\n************ End Movie Results ************\n`)
        }), function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
          }
      break;

      case "concert-this":

      axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=${keys.bandsintown}`).then(
        function(response) {
          for (let i = 0; i < 3; i++) {
            console.log(`\n`);
            console.log(`************ Concert Information ************\n`);
            console.log(`Venue Name: ${response.data[i].venue.name}`);
            console.log(`Venue location: ${response.data[i].venue.city}`);
            var concertDate = moment(response.data[i].datetime);
            var formatedConcertDate = concertDate.format("MM/DD/YYYY");
            console.log(`Date of event: ${formatedConcertDate}`);
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

          // spotify search
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
                console.log(`\n`);
                console.log(`************ Song Information ************\n`);
                console.log(`Song name: ${item.name}`);
                console.log(`Artist name: ${item.album.artists[0].name}`);
                console.log(`Album name: ${item.album.name}`);
                console.log(`Song preview url: ${item.preview_url}`);
              })
            });
          }  
          songName();

        break;
      }
    }
        if (command !== "do-what-it-says") {
          runSwitch(command, userInput)
        }
        else {
            fs.readFile('random.txt', 'utf8', function(err, data) {
              if (err) {
                return console.log(err);
              }
              var input = data.split(",")
              var doItCommand = input[0]
              var doItInput = input[1]
              runSwitch(doItCommand, doItInput);
              console.log(data);
            })
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

