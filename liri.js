
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

  // function to run switch for user commands and search input 
  function runSwitch (command, userInput) {

    switch (command) {

      // start movie-this code
      case "movie-this":

      // this is the default moive if no user input is added after user command 
      if (userInput === undefined) {
        userInput = "Mr Nobody"; //default movie
      }

      // Request with axios to the OMDB API for movie-this command and user search input
      axios.get(`http://www.omdbapi.com/?t=${userInput};&y=&plot=short&apikey=${keys.omdb.key}`).then(
        function(response) {
          console.log(`\n************ Start Movie Results ************\n`)
          console.log(`Movie name is: ${response.data.Title} \nMovie release year is: ${response.data.Year} \nIMBD rating: ${response.data.imdbRating} \nRotten Tomatoes rating: ${response.data.Ratings[1].Value} \nCountry of origin: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nCast: ${response.data.Actors}`);
          console.log(`\n************ End Movie Results ************\n`)
        }), function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
          }
        
      break;

      // Start concert-this code 
      case "concert-this":

      // this message will be shown if user does not add search criteria 
      if (userInput === undefined){
        console.log("Please enter a band or artist to search for concert information");
      } else {
        // Request with axios to the Bands In Town API for concert-this command and user search input
        axios.get(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=${keys}`).then(

        function(response) {
          // if statement to log no upcoming shows instead of throwing an error 
          if (concertDate === undefined) {
            console.log(`No upcoming shows are scheduled`);
          } else {
            for (let i = 0; i < 3; i++) {
              var concertDate = moment(response.data[i].datetime);
              var formatedConcertDate = concertDate.format("MM/DD/YYYY");
              console.log(`\n************ Concert Information ************\n`);
              console.log(`Venue Name: ${response.data[i].venue.name} \nVenue location: ${response.data[i].venue.city}, ${response.data[i].venue.region} \nDate of event: ${formatedConcertDate}`);
            }
         }
         }), function(err) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        }
      }
      break;

      // Request to Spotify API for spotify-this-song command and user search input
      case "spotify-this-song":

          function songName () { 
            // this is the default song if no user input is added after user command 
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
              data.tracks.items.map(item => {
                console.log(`\n`);
                console.log(`************ Song Information ************\n`);
                console.log(`Song name: ${item.name} \nArtist name: ${item.album.artists[0].name} \nAlbum name: ${item.album.name} \nSong preview URL: ${item.preview_url}`);
              })
            });
          }  
          songName();

        break;

        // statement to be displayed if no command is added by user
        default: 
          console.log(`Sorry, I do not understand this command. Please give me one of the following commands \n"movie-this" followed by your movie of choice \n"concert-this" followed by your band or artist of choice \n"spotify-this song" followed by song of choice \n"do-what-it-says"`);
      }
    }

      // Code for do-what-it-says command
      if (command !== "do-what-it-says") {
        runSwitch(command, userInput)
      } else {
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
    
  


