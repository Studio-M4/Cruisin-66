const fs = require('fs');

module.exports = {
    development: {
      username: 'root',
      password: 'test',
      database: 'cruisin66_dev',
      host: '127.0.0.1',
      dialect: 'mysql',
      insecureAuth: true
    },
    test: {
      username: 'root',
      password: 'test',
      database: 'cruisin66_test',
      host: '127.0.0.1',
      dialect: 'mysql'
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql'
    }
}


// module.exports = { 
//     database: 'cruisin66', 
//     username: 'root', 
//     password: null,
// }


//for Heroku
//instatiate environment variables
// require('dotenv').config();  

// let CONFIG = {} //Make this global to use all over the application

// CONFIG.app          = process.env.APP   || 'dev';
// CONFIG.port         = process.env.PORT  || '3000';

// CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
// CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
// CONFIG.db_port      = process.env.DB_PORT       || '3000';
// CONFIG.db_name      = process.env.DB_NAME       || 'cruisin66';
// CONFIG.db_user      = process.env.DB_USER       || 'root';
// CONFIG.db_password  = process.env.DB_PASSWORD   ||  null;

// module.exports = CONFIG;