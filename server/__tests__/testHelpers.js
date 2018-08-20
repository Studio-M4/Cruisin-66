const makeResObj = (statusNum, response) => ({
  status: status => {
    expect(status).toEqual(statusNum);
    return {
      send: data => {
        expect(data).toEqual(response);
      },
    };
  },
  sendStatus: status => {
    expect(status).toEqual(statusNum);
  },
});

//test to make jest happy
test('should be truthy', () => {
  expect(true).toBeTruthy();
});

  let req = { body: { username: 'exists', password: 'password' }, session: { regenerate: cb => cb() } };
  let sessionCreation = {regenerate: req.session.regenerate, user: 'exists'};
  let res = makeResObj(200, sessionCreation); 

console.log(res)


exports.makeResObj = makeResObj;
