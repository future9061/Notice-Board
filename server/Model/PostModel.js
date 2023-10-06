const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postNum: Number,
  title: String,
  content: String,
  img: {
    name: String,
    imgId: String,
    caption: String,
    imgUrl: String
  },
  user: {
    uid: String,
    displayName: String,
    email: String,
    photoURL: String
  },
  date: String,
  repleNum: {
    type: Number,
    default: 0
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post