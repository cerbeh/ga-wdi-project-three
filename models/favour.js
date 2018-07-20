const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const favourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String/*, required: true */},
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  volunteers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  chosen_volunteers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  status: { type: String },
  comments: [commentSchema],
  points: { type: Number, required: true },
  category: { type: String, required: true },
  location: {
    lat: { type: Number/*, required: true*/ },
    lng: { type: Number/*, required: true*/ }
  }
});

favourSchema.virtual('similarFavours', {
  localField: 'category',
  foreignField: 'category',
  ref: 'Favour'
});

favourSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    if(json.similarFavours === null) {
      delete json.similarFavours;
      return json;
    }
    json.similarFavours.forEach((el, ind) => {
      if (String(json._id) === String(el.id)) {
        json.similarFavours.splice(ind, 1);
      }
    });
    return json;
  }
});

module.exports = mongoose.model('Favour', favourSchema);
