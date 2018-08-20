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


            // data={[
            //   {
            //     id: 1,
            //     name: "Taipei 101",
            //     description: "Come here for a spectacular view. Best time is at sunset!",
            //     url: "http://images.skyscrapercenter.com/building/tapei101_ext-main2_(c)taipeifinancial.jpg",
            //   },
            //   {
            //     id: 2,
            //     name: "Taroko National Park",
            //     description: 'My favorite site is the Eternal Spring Shrine!',
            //     url: "http://www.thelostpassport.com/wp-content/uploads/2016/09/Overlooking-the-river-in-Taroko-Gorge-National-Park.jpg",
            //   },

            //   {
            //     id: 6,
            //     title: "accusamus ea aliquid et amet sequi nemo",
            //     url: "http://placehold.it/600/56a8c2",
            //     thumbnailUrl: "http://placehold.it/150/56a8c2"
            //   }
            // ]}