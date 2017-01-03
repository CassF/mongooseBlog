const mongoose = require('mongoose');

//creates a new schema
let UserSchema = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    admin: Boolean
});

//tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('User', UserSchema);