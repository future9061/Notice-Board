const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  reple: String,
  postNum: Number,
  user: {
    uid: String,
    displayName: String,
    email: String,
    photoURL: String
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment