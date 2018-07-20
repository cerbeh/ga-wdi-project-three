/* global api, expect, describe, it, beforeEach */

const Favour = require('../../models/favour');
const User = require('../../models/user');

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

let favour;

describe('GET /favours/:id', () => {

  beforeEach(done => {
    Favour.remove({})
      .then(() => User.remove({}))
      .then(() => User.create(userData))
      .then(user => {
        favourData.owner = user;
        return Favour.create(favourData);
      })
      .then(res => favour = res)
      .then(() => done());
  });

  it('should return status 200', done => {
    api.get(`/api/favours/${favour._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/favours/${favour._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return a favour object', done => {
    api.get(`/api/favours/${favour._id}`)
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

  // remember to put secureRoute back

  it('should return the correct data', done => {
    api.get(`/api/favours/${favour._id}`)
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
