/* global api, expect, describe, it, beforeEach */

const Favour = require('../../models/favour');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const favourData = {
  title: 'Favour title',
  category: 'Favour category'
};

let token;

describe('POST /favours', () => {

  beforeEach(done => {
    Favour.remove({})
      .then(() => User.remove({}))
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        favourData.owner = user;
        return Favour.create(favourData);
      })
      .then(() => done());
  });

  it('should return a 401 unauthorized response', done => {

    api.post('/api/favours')
      .send(favourData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {

    api.post('/api/favours')
      .set('Authorization', `Bearer ${token}`)
      .send(favourData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/favours')
      .set('Authorization', `Bearer ${token}`)
      .send(favourData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the created favour object', done => {
    api.post('/api/favours')
      .set('Authorization', `Bearer ${token}`)
      .send(favourData)
      .end((err, res) => {
        expect(res.body).to.include.keys([
          '_id',
          'title',
          'category',
          'owner'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/favours')
      .set('Authorization', `Bearer ${token}`)
      .send(favourData)
      .end((err, res) => {
        expect(res.body.title).to.eq(favourData.title);
        expect(res.body.category).to.eq(favourData.category);
        expect(favourData.owner._id.equals(res.body.owner._id)).to.be.true;
        expect(res.body.owner.username).to.eq(favourData.owner.username);
        expect(res.body.owner.email).to.eq(favourData.owner.email);
        done();
      });
  });

});
