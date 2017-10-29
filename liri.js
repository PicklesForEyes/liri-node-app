var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var fs = require('fs');
var inq = require('inquirer');

var keyword;


inq.prompt([

    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
      name: 'action'
    }

  ])
  .then(function(response) {

    switch(response.action) {
      case 'my-tweets':
        break;

      case 'spotify-this-song':
        break;

      case 'movie-this':
        break;

      case 'do-what-it-says':
        break;
    }

  })

  function myTweets() {
    // ajax call twitter
  }

  function thisSong() {
    inq.prompt([
      {
        type: 'input',
        message: 'Which song do you want to look up?',
        name: 'songInput'
      }
    ])
    .then(function(response) {
      console.log(response)
      //ajax call to spotify
    })
  }

  function thisMovie() {
    inq.prompt([
      {
        type: 'input',
        message: 'What movie would you like to look up?',
        name: 'movieInput'
      }
    ])
    .then(function(response) {
      console.log(response)
      //ajax call to omdb
    })
  }

  function rando() {
    // uses fs to input random.txt value to spotify-this-song
  }