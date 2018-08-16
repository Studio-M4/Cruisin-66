// This is the file that pass request to db User model
const bcrypt = require('bcrypt-nodejs');
const db = require('../../db/models/');
const hash = require('../utilities/helps.js');

let login = (query, callback) => {
  db.User.findOne({ 
    where: {
      email: query.email
    }
  }) 
  .then((existingUser) => {
    console.log(existingUser);
    if (existingUser !== null) {
      bcrypt.compare(query.password, existingUser.password, function(err, result) {
        console.log(result);
        console.log(err);
        if (result) {
          console.log('User login successfully!');
          callback(null, existingUser);
        } else {
          console.log('Wrong password!');
          callback(null, { messageCode: 102, message: 'Wrong password' });
        }
      });
    } else {
      console.log('User does not exist');
      callback(null, { messageCode: 103, message: 'User does not exist' });
    }
  })
  .catch((err) => {
    // Handle any error in the chain
    console.error(err);
    callback(err, null);
  });
}

let createNewUser = (newUser, callback) => {
  console.log('here');
  db.User.findOne({ 
    where: {
      email: newUser.email
    }
  })
  .then((existingUser) => {
    console.log(existingUser);
    if (existingUser !== null) {
      console.log('Email already exists');
      callback(null, { messageCode: 101, message: 'User email already exists' }); 
    } 
    else {
      hash.hashPassword(newUser, (err, userResult) => {
        db.User.create({
          userName: userResult.userName,
          firstName: userResult.firstName,
          lastName: userResult.lastName,
          email: userResult.email,
          password: userResult.password
        }).then((createdUser) => {
          console.log(createdUser);
          callback(null, createdUser);
        });
      });
    }        
  }) 
  .catch((err) => {
    // Handle any error in the chain
    console.error(err);
    callback(err, null);
  });
}

module.exports.createNewUser = createNewUser;
module.exports.login = login;
