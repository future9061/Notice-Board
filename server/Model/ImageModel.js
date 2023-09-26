const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  imgId: String,
  caption: String,
  imgUrl: String
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image