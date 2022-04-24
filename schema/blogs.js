const mongoose = require("mongoose");

const blogs = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  tags: { type: [String] },
  flieUpload: { type: String },
  upvote: {
    type: Number,
    default: 0,
  },
  creator: { type: String },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Blogs", blogs);
