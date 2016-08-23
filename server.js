// set up ======================================================================


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port  	 = process.env.PORT || 8080;
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var moment = require('moment');
var Q = require('q');
var gfeed = require('google-feed-api');
var request = require('request');

console.log('vars set');
// configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

// app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

console.log('app use set');

// configs
api = require('./config/api.js');

// weather feed ===============================================================
var getWeather = function() {
  request({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=West%20Chester,PA&appid='+api.openweathermap+'&units=imperial',
    method: 'GET'
  }, function(error, response, body){
    if(error) {
      console.log(error, body);
    } else {
      setTimeout(function() {
        io.emit('weatherUpdate', body);
      }, 1000);
    }
  });
};


// google feed =================================================================

// caches
var topNewsCache = {};
var USNewsCache = {};

var getTopNewsFeed = function() {

  var topNewsFeed = new gfeed.Feed('http://feeds.reuters.com/reuters/topNews');
  var topNewsCache = {};

  var addNews = function(newsItem, index) {
    topNewsCache[index] = {title: newsItem.title, contentSnippet: newsItem.contentSnippet, publishedDate: newsItem.publishedDate, content: newsItem.content};
  };

  topNewsFeed.listItems(function(items) {
    items.forEach(addNews);
  });

  setTimeout(function() {
    io.emit('topNewsFeedUpdate', topNewsCache);
  }, 1000);

  setInterval(function() {
    io.emit('topNewsFeedUpdate', topNewsCache);
  }, 360000);

};

var getUSNewsFeed = function() {

  var USNewsFeed = new gfeed.Feed('http://feeds.reuters.com/reuters/domesticNews');
  var USNewsCache = {};

  var addNews = function(newsItem, index) {
    USNewsCache[index] = {title: newsItem.title, contentSnippet: newsItem.contentSnippet, publishedDate: newsItem.publishedDate, content: newsItem.content};
  };

  USNewsFeed.listItems(function(items) {
    items.forEach(addNews);
  });

  setTimeout(function() {
    io.emit('USNewsFeedUpdate', USNewsCache);
  }, 1000);

  setInterval(function() {
    io.emit('USNewsFeedUpdate', USNewsCache);
  }, 360000);

};

console.log('functions set');

getTopNewsFeed();
getUSNewsFeed();
getWeather();

console.log('functions called');

// routes ======================================================================
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
  // io.on('pageLoaded', function(isLoaded) {
    // if(isLoaded) {
      getTopNewsFeed();
      getUSNewsFeed();
      getWeather();
    // }
  // });
});

app.get('/js/controllers/main.js', function(req, res) {
  res.sendfile(__dirname + '/public/js/controllers/main.js');
});

app.get('/js/services/mirror.js', function(req, res) {
  res.sendfile(__dirname + '/public/js/services/mirror.js');
});

app.get('/js/core.js', function(req, res) {
  res.sendfile(__dirname + '/public/js/core.js');
});

app.get('/favicon.ico', function(req, res) {
  res.sendfile(__dirname + '/public/images/favicon.ico');
});

app.get('/styles/*.css', function(req, res) {
  res.sendfile(__dirname + '/public/styles/index.css');
});

console.log('routes set');

// listen (start app with node server.js) ======================================
server.listen(port);
// console.log("App listening on port " + port);
