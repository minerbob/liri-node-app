
var axios = require("axios");
var moment = require("moment");
var AjaxCalls = require("./AjaxCalls");

var call = process.argv[2];
var noun = process.argv[3];
var ajaxCalls = new AjaxCalls();

switch (call) {
  case "concert-this":
    ajaxCalls.callConcert(noun);

  case "spotify-this-song":
    ajaxCalls.spotify_this_song(noun);
}