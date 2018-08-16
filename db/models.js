var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require('./config.js')[env];

var db = new Sequelize('cruisin66_dev', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// User table
const User = db.define('User', {
  userName: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  photoAvar: Sequelize.STRING,
});

// Itinerary table
const Itinerary = db.define('Itinerary', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

// Stop table
const Stop = db.define('Stop', {
  name: Sequelize.STRING,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  avgRating: Sequelize.FLOAT,
  address: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  audioFile: Sequelize.STRING,
});

// Define table association relationships
User.hasMany(Itinerary);
Itinerary.belongsTo(User);

Itinerary.hasMany(Stop);
Stop.belongsTo(Itinerary);

User.sync();
Itinerary.sync();
Stop.sync();

exports.User = User;
exports.Itinerary = Itinerary;
exports.Stop = Stop;