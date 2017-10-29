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