var http   = require('http');
var mysql = require('mysql');
const axios = require('axios');

describe('Server signup functionality', function() {

    var dbConnection;

    beforeEach(function(done) {
        dbConnection = mysql.createConnection({
        host: process.env.RDS_HOSTNAME || '127.0.0.1',
        user: process.env.RDS_USERNAME || "root",
        password: process.env.RDS_PASSWORD || "test",
        database: process.env.database || "cruisin66_dev",
        port: process.env.RDS_PORT || 3000
        })
        dbConnection.connect(function(err) {
        if(err) {
            console.error('Connection Error:', err);
            done();
        } else {
            console.log('Database connected!');
            done();
        }
        });
    });

    afterEach(function(done) {
        var tablename = "users"
        //Empty users table after each test
        dbConnection.query("truncate " + tablename, function(err) {
            if(err) {
            console.error('Connection Error: ', err);
            done();
            } else {
            dbConnection.end();
            done();
            }
        });
    });

    it('should return a users token after signup', async () => {
        const res = await axios.post("http://localhost:3000/signup", {
            firstName: 'Harry',
            lastName: 'Potter',
            email: 'hp@gmail.com',
            password: 'test'
          })
        expect(res.data.token).toBeDefined()
        expect(typeof res.data.token).toBe('object')
        expect(res.data.email).toBe('hp@gmail.com')
    })




});



// const user = require ('../controllers/user')
// const { makeResObj } = require ('./testHelpers');

// jest.mock('../routes/login');
// const login = require ('../routes/login');

// jest.mock('bcrypt-nodejs');
// const bcrypt = require('bcrypt-nodejs');


// describe ('Login', () => {

    // bcrypt.compare = (pass, hash, cb) => cb (null, pass + 'hashed' === hash); 

    // it ('should log in if the username exists and password matches', async () => {
    //     let req = { body: { username: 'exists', password: 'password' }, session: { regenerate: cb => cb() } };
    //     let sessionCreation = {regenerate: req.session.regenerate, user: 'exists'};
    //     let res = makeResObj(200, sessionCreation); 
    //     await user.login(req,res);
    // })

    // test('should logout', async () => {
    //     let req = { session: { destroy: cb => cb() } };
    //     let res = makeResObj(200);
    //     await user.logout(req, res);
    // });
  
// })
