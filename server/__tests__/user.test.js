const user = require ('../controllers/user')
const { makeResObj } = require ('./testHelpers');

jest.mock('../routes/login');
const login = require ('../routes/login');

jest.mock('bcrypt-nodejs');
const bcrypt = require('bcrypt-nodejs');

describe ('Login', () => {

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
  
})

