require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment")


//make sure user is capture the commands
var userCommand = process.argv[2];
var userRequest = process.argv.slice(3).join(" ");

console.log(userCommand);
execute(userCommand, userRequest)
function execute(userCommand, userRequest) {
    switch (userCommand) {
        case "concert-this":
            concert(userRequest)
            break;
        case "spotify-this-song":
            spotifySong(userRequest)
            break;
        case "movie-this":
            movieFun(userRequest)
            break;
        case "do-what-it-says":
            saysWhat(userRequest)
            break;
    }
}
//function concert(){
//    console.log("concert")
//}
//check if userCommand is "spotify-this-song"
function spotifySong(userRequest) {
    spotify.search({ type: 'track', query: userRequest }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
            //    console.log("spotify")
        }
        var songs = data.tracks.items
        // console.log(songs)
        for (var i = 0; i < songs.length; i++) {
            //console.log(songs[i]);
            // * Artist(s)
            console.log("___________________________________________")
            console.log("")
            console.log("Artists: " + songs[i].artists.map(getArtistNames));
            // * The song's name
            console.log("Song Name: " + songs[i].name);
            // * A preview link of the song from Spotify
            console.log("Preview: " + songs[i].preview_url);
            // * The album that the song is from
            console.log("Album: " + songs[i].album.name);
            console.log("")
            console.log("___________________________________________")

        }
    });
}
function getArtistNames(artist) {
    return artist.name
}
function movieFun(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
        console.log("movie")
        //check if userCommand is "movie-this"
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios
            .get(queryUrl)
            .then(function (response) {
                // console.log(response.data)
                // * Title of the movie.
                console.log("Title: " + response.data.Title);
                // * Year the movie came out.
                console.log("Year: " + response.data.Year);
                // * General Rating.
                console.log("Rated: " + response.data.Rated);
                // * Movie Genre
                console.log("Genre: " + response.data.Genre);
                // * Actors in the movie.
                console.log("Actors: " + response.data.Actors);
                // * Plot of the movie.
                console.log("Plot: " + response.data.Plot);
                // * Language of the movie.
                console.log("Lanuage: " + response.data.Language);
                // * Country where the movie was produced.
                console.log("Country: " + response.data.Country);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                // * IMDB Rating of the movie.
                console.log("Imdb Rating: " + response.data.imdbRating);
            })
            .catch(function (error) {
                console.log(error)
            });
    } else {
        console.log("movie")
        //check if userCommand is "movie-this"
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios
            .get(queryUrl)
            .then(function (response) {
                // console.log(response.data)
                // * Title of the movie.
                console.log("Title: " + response.data.Title);
                // * Year the movie came out.
                console.log("Year: " + response.data.Year);
                // * General Rating.
                console.log("Rated: " + response.data.Rated);
                // * Movie Genre
                console.log("Genre: " + response.data.Genre);
                // * Actors in the movie.
                console.log("Actors: " + response.data.Actors);
                // * Plot of the movie.
                console.log("Plot: " + response.data.Plot);
                // * Language of the movie.
                console.log("Lanuage: " + response.data.Language);
                // * Country where the movie was produced.
                console.log("Country: " + response.data.Country);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Source);
                // * IMDB Rating of the movie.
                console.log("Imdb Rating: " + response.data.imdbRating);
            })
            .catch(function (error) {
                console.log(error)
            });
        // Display to the user:
    }
}
function saysWhat() {
    console.log("says")
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",")
        if (dataArr.length === 2) {
            execute(dataArr[0], dataArr[1])
        }
    })
    //check if userCommand is "do-what-it-says"
}
//check if userCommand is "concert-this" and so on
//run an API call using axios to the BandsInTown 
//receive user's search term in the queryUrl
function concert(userRequest) {
    if (!userRequest) {
        userRequest = "Matt & Kim";
        console.log("userRequest");
        var queryUrl = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";
        axios
            .get(queryUrl)
            .then(function (response) {
                //console.log(response.data[0]);
                console.log("Artist: " + response.data[0].artist.name);
                console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Country: " + response.data[0].venue.country);
                console.log("City: " + response.data[0].venue.city)
            })
    } else {
        var queryUrl = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";
        axios
            .get(queryUrl)
            .then(function (response) {
                //console.log(response.data[0]);
                console.log("Artist: " + response.data[0].artist.name);
                console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Country: " + response.data[0].venue.country);
                console.log("City: " + response.data[0].venue.city)
            })
            //format the date of the event in moment to MM/DD/YYYY
            //Date of concert - moment(datetime).format("MM/DD/YYYY")
            //Venue
            //Venue location

            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.artist);
                    console.log(error.response.data.venue.name);
                    console.log(error.response.data.venue.location);
                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log("Try Again", error.message);
                };
            });
    }
}

//place an error message if userCommand something not listed