require("dotenv").config();
// key module
var keys = require('./keys.js');
//require npm packages
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var client = new twitter(keys.twitter);

console.log(keys.twitter);

function twitter() {
    var params = { screen_name: 'rabbithole', count: 20 };
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