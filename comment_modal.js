const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    comment: String
});

module.exports = mongoose.model("Comment", commentSchema);