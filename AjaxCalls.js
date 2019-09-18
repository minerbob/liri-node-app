var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var AjaxCalls = require("./AjaxCalls");

var AjaxCalls = function () {

    var divider = "\n------------------------------------------------------------\n\n";

    this.callConcert = function (noun) {
        var URL = "https://rest.bandsintown.com/artists/" + noun + "/events?app_id=codingbootcamp";

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
    };


        module.exports = AjaxCalls;
