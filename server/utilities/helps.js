const bcrypt = require('bcrypt-nodejs');

const createSession = (req, res, newUser) => {
  return req.session.regenerate(() => {
    req.session.user = newUser;

    const withoutPassword = {
      userId: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      email: newUser.email,
      photoAvar: newUser.photoAvar,
    };
    res.send({
      token: withoutPassword,
    });
  });
};

const isLoggedIn = (req) => {
  return req.session ? !!req.session.user : false;
};

const checkUser = (req, res, next) => {
  if (!module.exports.isLoggedIn(req)) {
    res.json({
      messageCode: 401,
      message: 'User must login',
    });
  } else {
    next();
  }
};

const hashPassword = (user, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (err) {
        console.log(error);
      }
      const userObj = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: hash,
      };
      callback(null, userObj);
    });
  });
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validateUrl = (url) => {
  const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regexp.test(url); 
};

module.exports.hashPassword = hashPassword;
module.exports.validateEmail = validateEmail;
module.exports.validateUrl = validateUrl;

module.exports.createSession = createSession;
module.exports.isLoggedIn = isLoggedIn;
module.exports.checkUser = checkUser;