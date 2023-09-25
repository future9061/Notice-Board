const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  imgNum: String,
  caption: String,
  url: String
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image