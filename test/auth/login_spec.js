/* global api, describe, beforeEach expect it*/
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');
const User = require('../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.c',
  password: 'test',
  passwordConfirmation: 'test'
};

let userId;

describe('POST /login',()=> {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id.toString();
        done();
      });
  });

  it('should return a valid token', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.body.token).to.exist;
        jwt.verify(res.body.token, secret, (err, payload) => {
          expect(payload.sub).to.equal(userId);
          expect(payload.iat).to.be.a('number');
          expect(payload.exp).to.be.a('number');
          done();
        });
      });
  });

  it('should return a 401 response if not user isnt registered', done => {
    api.post('/api/login')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });


  it('should return a 401 response if wrong password entered', done => {
    const badData = { email: 'test@test.c', password: 'incorrect' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response if registered', done => {
    api.post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});
