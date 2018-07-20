/* global describe beforeEach it expect api*/

const User = require('../../models/user');

const userData = {
  username: 'test',
  email: 'test@test.c',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /register', ()=> {

  beforeEach(done => {
    User.remove({})
      .then(() => {
        done();
      });
  });

  it('should return a 200 response', done => {
    api.post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

});
