const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: String,
  postNum: Number
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter