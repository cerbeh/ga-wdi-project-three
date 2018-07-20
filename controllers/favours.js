const Favour = require('../models/favour');
const User = require('../models/user');
const twilio = require('../lib/twilio');

function indexRoute(req, res, next){
  Favour.find()
    .populate('similarFavours')
    .populate('owner')
    .then(favours => res.json(favours))
    .catch(next);
}

function showRoute(req, res, next){
  Favour.findById(req.params.id)
    .populate('volunteers')
    .populate('chosen_volunteers')
    .populate('owner')
    .populate('comments.author')
    .populate('similarFavours')
    .then(favour => res.json(favour))
    .catch(next);
}

function updateRoute(req, res, next){
  Favour.findById(req.params.id)
    .then(favour => favour.set(req.body))
    .then(favour => favour.save())
    .then(favour => res.status(201).json(favour))
    .catch(next);
}

function createRoute(req, res, next){
  req.body.owner = req.currentUser;
  req.body.status = 'tender';
  Favour.create(req.body)
    .then(favour => {
      User.findById(req.currentUser)
        .then(user => {
          user.points = user.points - req.body.points;
          user.save();
        });
      res.status(201).json(favour);
    })
    .catch(next);
}

function deleteRoute(req, res, next){
  Favour.findById(req.params.id)
    .then(favour => favour.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function addVolunteerRoute(req, res, next) {
  Favour.findById(req.params.id)
    .populate('volunteers')
    .populate('owner')
    .then(favour => {
      favour.volunteers.push(req.currentUser);
      return favour.save();
    })
    .then(favour => {
      res.json(favour);
    })
    .catch(next);
}

function chooseVolunteerRoute(req, res, next){
  Favour.findById(req.params.id)
    .populate('volunteers') //do i need this?
    .populate('owner') //do i need this?
    .then(favour => {
      favour.chosen_volunteers = favour.volunteers.filter(volunteer => volunteer._id.toString() === req.params.volunteerId);
      favour.volunteers = favour.volunteers.filter(volunteer => volunteer._id.toString() !== req.params.volunteerId);

      favour.status = 'inProgress';

      if(favour.chosen_volunteers[0].telephone){
        twilio.sendSMS(`Hello ${favour.chosen_volunteers[0].username} - You have been chosen to complete the favour ${favour.title} for ${favour.owner.username}. Thanks for contributing to the Karma Community!`, favour.chosen_volunteers[0].telephone);
      }

      return favour.save();
      // return twilio.sendSMS(`Hello ${favour.chosen_volunteers[0].username} - You have been chosen to complete this favour. Thanks for contributing to the Karma Community!`, favour.chosen_volunteers[0].telephone)
      //   .then(() => favour.save());
    })
    .then(favour => res.json(favour))
    .catch(next);
}

function changeFavourStatusRoute(req, res, next){
  Favour.findById(req.params.id)
    .populate('owner')
    .populate('chosen_volunteers')
    .then(favour => {
      if(favour.status === 'inProgress'){
        favour.status = 'completed';
        if(favour.owner.telephone){
          twilio.sendSMS(`Hello ${favour.owner.username} - Your volunteer ${favour.chosen_volunteers[0].username} has marked your favour ${favour.title} as complete. Please check its completion and verify in the app.`, favour.owner.telephone);
        }

        return favour.save();
      } else if (favour.status === 'completed'){

        favour.chosen_volunteers.forEach(volunteer => {
          User.findById(volunteer._id)
            .then(user => {
              user.completedFavours.push(favour._id);
              user.points = user.points + favour.points;
              user.save();
            });
        });

        favour.status = 'verified';
        if(favour.chosen_volunteers[0].telephone){
          twilio.sendSMS(`Hello ${favour.chosen_volunteers[0].username} - Thanks for completing the favour ${favour.title}. ${favour.owner.username} has verified its completion and you have been given your KarmaCoins! Thanks for contributing to the Karma Community.`, favour.chosen_volunteers[0].telephone);
        }
        return favour.save();
      }
    })
    .then(favour => res.json(favour))
    .catch(next);
}

function commentCreateRoute(req, res, next){
  req.body.author = req.currentUser;
  Favour.findById(req.params.id)
    .populate('comments.author')
    .then(favour => {
      favour.comments.push(req.body);
      return favour.save();
    })
    .then(favour => res.json(favour))
    .catch(next);
}

function commentDeleteRoute(req, res, next){
  Favour.findById(req.params.id)
    .populate('volunteers')
    .populate('chosen_volunteers')
    .populate('owner')
    .populate('comments.author')
    .populate('similarFavours')
    .then(favour => {
      const comment = favour.comments.id(req.params.commentId);
      comment.remove();
      return favour.save();
    })
    .then(favour => res.json(favour))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  create: createRoute,
  delete: deleteRoute,
  addVolunteer: addVolunteerRoute,
  chooseVolunteer: chooseVolunteerRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute,
  changeFavourStatus: changeFavourStatusRoute
};
