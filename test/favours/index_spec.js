/* global api, expect, describe, it, beforeEach */

const Favour = require('../../models/favour');
const User = require('../../models/user');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const favourData = [{
  title: 'Favour title',
  category: 'Favour category'
}];

describe('GET /favours', () => {

  beforeEach(done => {
    Favour.remove({})
      .then(() => User.remove({}))
      .then(() => User.create(userData))
      .then(user => {
        favourData[0].owner = user;
        return Favour.create(favourData);
      })
      .then(() => done());
  });

  it('should return status 200', done => {

    api.get('/api/favours')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/favours')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/favours')
      .end((err, res) => {
        res.body.forEach(favour => expect(favour).to.be.an('object'));
        done();
      });
  });

  it('should return an array of favours', done => {
    api.get('/api/favours')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(favour => {
          expect(favour).to.include.keys([
            '_id',
            'title',
            'category',
            'owner'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/favours')
      .end((err, res) => {
        res.body.forEach((favour, index) => {
          expect(favour.title).to.eq(favourData[index].title);
          expect(favour.category).to.eq(favourData[index].category);
          expect(favourData[index].owner._id.equals(favour.owner._id)).to.be.true;
          expect(favour.owner.username).to.eq(favourData[index].owner.username);
          expect(favour.owner.email).to.eq(favourData[index].owner.email);
        });
        done();
      });
  });

});
