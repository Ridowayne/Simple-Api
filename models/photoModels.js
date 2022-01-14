const mongoose = require('mongoose');

const photosSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  color: String,
  description: String,
  url: String,
  photographer: String,
  likes: Number,
});
const Photo = mongoose.model('Photo', photosSchema);

module.exports = Photo;
