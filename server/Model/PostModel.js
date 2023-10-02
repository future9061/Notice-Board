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
  },
  date: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post