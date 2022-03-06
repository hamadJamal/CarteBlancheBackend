const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Username: String,
  Email: String,
  Password: String,
  Tasks: [JSON],
});

module.exports = mongoose.model("users", PostSchema);
