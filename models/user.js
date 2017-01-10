const mongoose = require('mongoose');

// create a new schema
let UserSchema = mongoose.Schema({
  firstName: { 
    type: String, 
    required: true
  },
    lastName: { 
    type: String, 
    required: true
  },
    email: { 
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
  }
});

//tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('User', UserSchema);