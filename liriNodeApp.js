require("dotenv").config();

//require npm packages
const keys = require("./keys.js")
const request = require('request')
const Twitter = require('twitter')
const client = new Twitter(keys.twitter)
const Spotify = require('node-spotify-api')
const fs = require('fs')

// input from the console
let input = process.argv
let action = input[2]
let inputs = input[3]

// switch case for the different functions
switch (action) {

    case "my-tweets":
        twitter(inputs)
        break

    case "spotify-this-song":
        spotifySong(inputs)
        break

    case "movie-this":
        movie(inputs)
        break

    case "do-what-it-says":
        doit()
        break



};

//pulls tweets 

function twitter(inputs) {
    var params = { screen_name: inputs, count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + "\n" + tweets[i].text);
                console.log("_____________________________");
            }
        } else {
            console.log(error);
        }
    });
};

// pulls songs by title using spotify 

function spotifySong(inputs) {
    var spotify = new Spotify(keys.spotify);

    if (!inputs) {
        inputs = "I Want it That Way";
    }

    spotify.search({ type: 'track', query: inputs }, function (error, data) {
        if (error) {
            console.log("An error has occured: " + error);
        } else {

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        }
    });
}

// pulls movie by title using omdb

function movie(inputs) {

    if (!inputs) {
        inputs = "Mr Nobody";
    }
    var queryurl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
    request(queryurl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieInfo = JSON.parse(body);

            console.log("Title: " + movieInfo.Title);
            console.log("Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Country: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
        }

        else {
            console.log("An error has occured: " + error);
        }
    });
}