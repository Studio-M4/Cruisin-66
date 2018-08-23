var express = require('express');
// Middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var util = require('./utilities/helps');

var app = express();

/****** SETUP HEADERS *****/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
  next();
});

// Set what we are listening on
app.set('port', 3000);
// Logging and parsing
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'jurassic eggs',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true},
    expires: new Date(Date.now() + (60 * 1000))
  })
);

app.get('/', util.checkUser, (req, res) => {});

// Set up the routes
app.post('/signup', require('./routes/signup.js'));
app.post('/login', require('./routes/login.js'));

app.post('/itinerary', require('./routes/createItinerary.js'));
app.get('/itineraries', require('./routes/getItineraries.js'));
app.get('/itinerary', require('./routes/getItineraryById.js'));

app.post('/stop', require('./routes/createStop.js'));
app.get('/stops', require('./routes/getStops.js'));
app.get('/stop', require('./routes/getStopById.js'));

app.get('/categories', require('./routes/getCategories.js'));

app.post('/itinerarycomments', require('./routes/createItineraryComments.js'));
app.get('/itinerarycomments', require('./routes/getItineraryComments.js'));

app.post('/stopcomments', require('./routes/createStopComments.js'));
app.get('/stopcomments', require('./routes/getStopComments.js'));

app.get('/profile/itineraries', require('./routes/getItinerariesByUserId.js'))

app.post('/favorite', require('./routes/addFavorite.js'))

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports.app = app;
