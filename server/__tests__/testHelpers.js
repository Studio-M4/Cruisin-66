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

exports.makeResObj = makeResObj;
