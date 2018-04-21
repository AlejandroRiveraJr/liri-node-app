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

// console.log(keys.twitter);

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

// Pulls Spotify song information based on song title
function spotifySong(inputs) {
    var spotify = new Spotify(keys.spotify);
    
    if (!inputs) {
        inputs = "I Want it That Way";
    }
    
    spotify.search({ type: 'track', query: inputs}, function (error, data) {
        if (error) {
            console.log("An error has occured: " + error);
        } else {
            console.log("----------------------------------------------------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("----------------------------------------------------------------");
        }
    });
}