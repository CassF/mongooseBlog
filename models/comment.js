const mongoose = require('mongoose');

//creates a new schema
let CommentSchema = mongoose.Schema({
    subject: String,
    comment: String
});

//tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Comment', CommentSchema);