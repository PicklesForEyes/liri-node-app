var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request')
var inq = require('inquirer');

var myTwitter = new Twitter(keys.twitter);

var mySpotify = new Spotify(keys.spotify);

// console.log(myTwitter, mySpotify)

var keyword;


inq.prompt([

    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
      name: 'action'
    }

  ])
  .then(function(response) {

    switch(response.action) {
      case 'my-tweets':
        myTweets();
        break;

      case 'spotify-this-song':
        getSong();
        break;

      case 'movie-this':
        thisMovie();
        break;

      case 'do-what-it-says':
        rando();
        break;
    }

  })


    var string = keys.twitter.consumer_key + ':' + keys.twitter.consumer_secret;
    var converted = new Buffer(string).toString('base64');

    // console.log(string, converted)
  function myTweets() {
    // console.log(JSON.stringify(myTwitter, null, 2))


    request({
      url : 'https://api.twitter.com/oauth2/token',
      method : 'POST',
      headers : {
        'Authorization' : 'Basic ' + converted,
        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : 'grant_type=client_credentials'
    },
    function(err, response, body) {
      // console.log(body);
    }
    )

    myTwitter.get('statuses/user_timeline', {screen_name: 'lawbe101', count: 20}, function(err, tweet, body) {
      if(err) throw err;
      for(var i = 0; i < 20; i++) {
        console.log('Tweeted: ' + tweet[i].text + '\nOn: ' + tweet[i].created_at + '\n');
      }
    })
  }

  function getSong() {
    inq.prompt([
      {
        type: 'input',
        message: 'Which song do you want to look up?',
        name: 'songInput',
        default: 'The Sign, Ace of Base'
      }
    ])
    .then(function(response) {
      var search = response.songInput.split(' ').join('+')
      thisSong(search);
    })
  }

  function thisSong(term) {
    mySpotify.search({
      type: 'track',
      query: term,
      limit: 1
    }, function(err, result) {
        if(err) {
          console.log('Error Occured: ', err);
          return;
        }
        var track = result.tracks.items[0];
        // console.log(JSON.stringify(track, null, 2));
        console.log('Artist: ' + track.artists[0].name +
          '\nSong Name: ' + track.name +
          '\nAlbum: ' + track.album.name +
          '\nPreview: ' + track.preview_url)
    })
  }

  function thisMovie() {
    inq.prompt([
      {
        type: 'input',
        message: 'What movie would you like to look up?',
        name: 'movieInput',
        default: 'Mr Nobody'
      }
    ])
    .then(function(response) {
      // console.log(response)
      var search = response.movieInput.split(' ').join('+')
      request('http://omdbapi.com/?apikey=40e9cece&t="' + search + '"&plot="short"',
        function(err, result, body) {
          if(err) {
            console.log('Error Occured: ', JSON.stringify(err, null, 2));
            return;
          }
          var movie = JSON.parse(result.body)
          console.log(movie.Title + ', ' + movie.Year +
            '\nIMDb Rating: ' + movie.Ratings[0].Value +
            '\nRotten Tomatoes Rating: ' + movie.Ratings[1].Value +
            '\nCountries of production: ' + movie.Country +
            '\nLanguage: ' + movie.Language +
            '\nPlot: ' + movie.Plot +
            '\nActors: ' + movie.Actors);
        })
    })
  }

  function rando() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      var search = data.split(' ').join('+')
      thisSong(search)
    });
  }

