const mongoose = require('mongoose');

//creates a new schema
let BlogSchema = mongoose.Schema({
    title: String,
    body: String
});

//tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Blog', BlogSchema);