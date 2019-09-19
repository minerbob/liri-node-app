require("dotenv").config();


var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var AjaxCalls = require("./AjaxCalls");

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var AjaxCalls = function () {

    var divider = "\n------------------------------------------------------------\n\n";

    this.callConcert = function (concert) {
        var URL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var concertData = [
                    "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"),
                    "Location: " + response.data[i].venue.city,
                    "Venue: " + response.data[i].venue.name,
                ].join("\n");
                console.log(concertData + "\n\n");
            }

            // Append concertData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", concertData + divider, function (err) {
                if (err) throw err;
                //console.log(concertData + "\n\n");
            });
        });

    };

    this.spotify_this_song = function (noun) {

        spotify
            .search({
                type: 'track',
                query: noun,
                limit: 1
            })
            .then(function (response) {
                // credit Ben for hanlding artists
                var jsonData = response.tracks.items[0];
                var artistsArr = jsonData.artists;
                var artist = artistsArr[0].name;
                if (artistsArr.length > 1) {
                    for (let i = 1; i < artistsArr.length; i++) {
                        artist += " & " + artistsArr[i].name
                    }
                }

                var song = [
                    "Artist(s): " + artist,
                    "Song name: " + jsonData.name,
                    "Preview link: " + jsonData.preview_url,
                    "Album name: " + jsonData.album.name,
                ].join("\n");
                
                console.log(song);
                //console.log(jsonData);
                fs.appendFile("log.txt", response + divider, function (err) {
                    if (err) throw err;
                    //console.log(response + "\n\n");
                });
            })
            .catch(function (err) {
                //console.log(err);
            });
    };

};


module.exports = AjaxCalls;
