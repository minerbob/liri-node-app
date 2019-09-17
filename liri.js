//require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");

var call = process.argv[2];
var noun = process.argv[3];
var response;

switch (call){
  case "concert-this":
      axios
  .get("https://rest.bandsintown.com/artists/" + call + "/events?app_id=codingbootcamp")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}