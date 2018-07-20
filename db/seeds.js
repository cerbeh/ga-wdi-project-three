const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Favour = require('../models/favour');
const User = require('../models/user');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([{
    username: 'Martin',
    email: 'm@m.m',
    password: 'm',
    passwordConfirmation: 'm',
    image: 'https://media.licdn.com/dms/image/C5603AQGu6wh3qYGBLw/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=XnUnHb-LzDPn31_F5TCnZj94SrBbkZT7dhtjiCR6CZU',
    bio: 'I\'ve worked in the social sector for years and love to contribute to the community. Particularly useful for working at events or caring for the elderly.',
    points: 400,
    telephone: '07530 486 805'
  },{
    username: 'Steve',
    email: 's@s.s',
    password: 's',
    passwordConfirmation: 's',
    image: 'https://media.licdn.com/dms/image/C5603AQE3dxyabVPi5Q/profile-displayphoto-shrink_200_200/0?e=1535587200&v=beta&t=j7-pRuhjXGBbnCd4ivBEY1S0gMwoG7VTSbJVwOKA3JM',
    bio: 'I love to help the KarmaCommunity. I have my security qualification so can help with large-scale events. I also love working with children and anything to do with sports. Reach out any time.',
    points: 300,
    telephone: '07530486805'
  },{
    username: 'Nick',
    email: 'n@n.n',
    password: 'n',
    passwordConfirmation: 'n',
    image: 'https://media.licdn.com/dms/image/C4D03AQGAdx9OO-rnhQ/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=1W9dgTtyBdRDuzigd2Yd0ZZDg7wPFoONbTfynCmguU4',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 200,
    telephone: '(075)30 486 805'
  },{
    username: 'Bianca',
    email: 'b@b.b',
    password: 'b',
    passwordConfirmation: 'b',
    image: 'https://media.licdn.com/dms/image/C5603AQGP8ydXXjyNfw/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=CxYDDIjlTbd7ibP8CCmXaiOnbowWDFOi51wbLVgM_h4',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 350,
    telephone: '07530-486-805'
  },{
    username: 'Rachel',
    email: 'r@r.r',
    password: 'r',
    passwordConfirmation: 'r',
    image: 'https://media.licdn.com/dms/image/C4E03AQGcViLKNakmhw/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=3LKBu-tMf3OkUKOmQQtwvF1yjrzuG8iJeH9hV3Jd3Gc',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 375,
    telephone: '+447530 486 805'
  },{
    username: 'Linda',
    email: 'l@l.l',
    password: 'l',
    passwordConfirmation: 'l',
    image: 'https://media.licdn.com/dms/image/C4D03AQFeCLnOxdNYog/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=ttKHbyOJJ2d9_1XNBNkKDU1SwITJCXQq8jSFgHzTdmM',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 1000
  },{
    username: 'James',
    email: 'j@j.j',
    password: 'j',
    passwordConfirmation: 'j',
    image: 'https://media.licdn.com/dms/image/C4D03AQHazaIQs2xaYQ/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=ATmiw41BLCHVpd4paMKJm-Rm2s6bWQU8M2_jI83AULA',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 100,
    telephone: '+447530 486 805'
  },{
    username: 'Josh',
    email: 'j@t.j',
    password: 'j',
    passwordConfirmation: 'j',
    image: 'https://media.licdn.com/dms/image/C4D03AQHRh22KeWwTRg/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=W5odKLyHdmVHxg6irq-9z1lwit71E4cqGzFqdbBzXgA',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 450
  },{
    username: 'Gerry',
    email: 'g@g.g',
    password: 'g',
    passwordConfirmation: 'g',
    image: 'https://pbs.twimg.com/profile_images/562341218416226304/JpFdjFFD_400x400.jpeg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 30
  },{
    username: 'Mike',
    email: 'mi@mi.mi',
    password: 'mi',
    passwordConfirmation: 'mi',
    image: 'https://media.licdn.com/dms/image/C5103AQGXY1I1jKf38g/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=jYVu7x8GtQubtJWBjlNzC_3dfHqlGLrB9nHzonY9qDQ',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.',
    points: 30
  }])
    .then(users => {
      console.log(`${users.length} users created.`);
      return Favour.create([{
        title: 'Lawnmower rental',
        description: 'I desperately need to borrow a lawnmower so I can tend to my garden (forest). If anyone has a large scale lawnmower they could lend me that would be super useful.',
        category: 'Domestic',
        owner: users[0],
        status: 'tender',
        volunteers: [users[2], users[5]],
        chosen_volunteers: [],
        comments: [{
          content: 'I\'ll do it, for a few points more',
          author: users[7]
        },{
          content: 'Hey, when do you need this by?',
          author: users[3]
        }],
        points: 20,
        location: {
          lat: 51.531270,
          lng: -0.156969
        }
      },{
        title: 'Steward at Church fair',
        description: 'I\'m looking for someone to help me a steward at our next Church fair. The local council madates that we have one for security due to the number of people on site. Can anyone help?',
        category: 'Events',
        owner: users[1],
        status: 'inProgress',
        chosen_volunteers: [users[0]],
        comments: [{
          content: 'Would love to, but I\'m out of town',
          author: users[3]
        },{
          content: 'Hey guys, lets just go to Jujus!',
          author: users[8]
        }],
        points: 75,
        location: {
          lat: 51.515252,
          lng: -0.072344
        }
      },{
        title: 'Cook at my BBQ',
        description: 'I\'m hosting a bbq for my little nephew and his friends birthday. It would be great if someone could help to cook the bbq whilst I look after the children. Anyone free?',
        category: 'Events',
        owner: users[4],
        status: 'inProgress',
        volunteers: [users[2], users[5]],
        comments: [{
          content: 'Would love to, but I\'m out of town',
          author: users[5]
        },{
          content: 'Hey guys, lets just go to Jujus!',
          author: users[8]
        }],
        chosen_volunteers: [users[0]],
        points: 20,
        location: {
          lat: 51.513845,
          lng: -0.098351
        }
      },{
        title: 'Feed my cat please',
        category: 'Domestic',
        description: 'I\'ll be away from my home next week and would love for someone to feed my cat whilst i\'m away. Any cat lovers available to help out?',
        owner: users[6],
        volunteers: [users[3], users[7], users[5]],
        chosen_volunteers: [],
        status: 'tender',
        comments: [],
        points: 20,
        location: {
          lat: 51.515252,
          lng: -0.072344
        }
      },{
        title: 'Check my homework',
        category: 'Education',
        description: 'Hey everyone - I\'m working on a big homework for school and I\'d love for someone older than me to give me some feedback. The topic is WW2 so anyone with a passion for history - even better!',
        owner: users[2],
        volunteers: [users[3],users[5]],
        chosen_volunteers: [users[3]],
        status: 'verified',
        comments: [],
        points: 30,
        location: {
          lat: 51.515252,
          lng: -0.072344
        }
      },{
        title: 'Tutor my son anyone?',
        category: 'Education',
        description: 'Hey everyone - My son struggles with Maths at school but is really keen to learn. Could anyone help him with algebra?',
        owner: users[1],
        volunteers: [users[3], users[5], users[0]],
        chosen_volunteers: [],
        status: 'tender',
        comments: [{
          content: 'Would love to, but I\'m out of town',
          author: users[3]
        },{
          content: 'Hey guys, lets just go to Jujus!',
          author: users[8]
        }],
        points: 50,
        location: {
          lat: 51.515252,
          lng: -0.072344
        }
      },{
        title: 'Run with my mum',
        category: 'Domestic',
        description: 'Hey everyone - My mum really wants to get fit but hates excersise. I thought if she had a friend to run with she might be more up for it. Would anyone want to join her?',
        owner: users[2],
        volunteers: [users[3],users[5]],
        chosen_volunteers: [users[1]],
        status: 'completed',
        comments: [],
        points: 30,
        location: {
          lat: 51.531270,
          lng: -0.156969
        }
      },{
        title: 'Tutor my daughter',
        category: 'Education',
        description: 'Hey everyone - My daughter struggles with English at school but is really keen to learn. Could anyone help him with algebra?',
        owner: users[6],
        volunteers: [users[3],users[5]],
        chosen_volunteers: [users[0]],
        status: 'verified',
        comments: [],
        points: 30,
        location: {
          lat: 51.515252,
          lng: -0.072344
        }
      }]);
    })
    .then(favours => console.log(`${favours.length} favours created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
