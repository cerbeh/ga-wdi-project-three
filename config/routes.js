const router = require('express').Router();
const favours = require('../controllers/favours');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/')
  .get(favours.index);

router.route('/favours')
  .get(favours.index)
  .post(secureRoute, favours.create);

router.route('/favours/:id')
  .get(favours.show)
  .put(secureRoute, favours.update)
  .delete(secureRoute, favours.delete);

router.route('/favours/:id/status')
  .put(secureRoute, favours.changeFavourStatus);

router.post('/favours/:id/comments', secureRoute, favours.commentCreate);

router.delete('/favours/:id/comments/:commentId', secureRoute, favours.commentDelete);

router.post('/favours/:id/volunteers', secureRoute, favours.addVolunteer);

router.post('/favours/:id/volunteers/:volunteerId', secureRoute, favours.chooseVolunteer);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.get('/users/:id', users.show);
router.get('/users/', users.index);


module.exports = router;
