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