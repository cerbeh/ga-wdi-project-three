const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance(),
  PNF = require('google-libphonenumber').PhoneNumberFormat;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  points: { type: Number },
  image: { type: String },
  bio: { type: String },
  telephone: { type: String },
  completedFavours: [{type: mongoose.Schema.ObjectId, ref: 'Favour' }]
},{
  id: false
});

userSchema.virtual('inProgress', {
  localField: '_id',
  foreignField: 'chosen_volunteers',
  ref: 'Favour'
});

userSchema.virtual('favours', {
  localField: '_id',
  foreignField: 'volunteer',
  ref: 'Favour'
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {

    if(json.inProgress) {
      json.inProgress.forEach((el, ind) => {
        if(el.status === 'verified') {
          json.inProgress.splice(ind, 1);
        }
        return json;
      });
    }

    delete json.password;
    return json;
  }
});


userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordsMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function checkTelephoneFormat(next) {
  if(this.isModified('telephone')) {
    this.telephone = phoneUtil.format(phoneUtil.parse(this.telephone, 'GB'), PNF.E164);
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
