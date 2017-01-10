//NPM Modules - No relative path as they are in node_modules
const express = require("express");
//create a new express and exports it - can now be used anywhere in our application
const app = module.exports = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const layouts = require('express-ejs-layouts');
const session = require("express-session");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const User = require('./models/user'); 

//These are my own modules that require a relative path to find them
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// add support for cookies
app.use(cookieParser());

// add support for sessions
app.use(session({
  resave: false, 
  saveUninitialized: true,
  secret: 'blogsecretkey'
}));


//connect to the database
mongoose.connect('mongodb://localhost/blogs');

// body parser
app.use(bodyParser.urlencoded({ extended: false }));


// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}));


//View Engine
app.set('view engine', 'ejs');


// load logged in user
app.use(function(req,res,next) {

  // no user id? just move on
  if(!req.session.user) {
     res.locals.user = false;
    next();
  } else {

    // load the user with the ID in the session
    User.findById(req.session.user , function(err, user){

      if(user) {
        // add the user to the request object
        req.user = user;
        // add it to locals so we can use it in all templates
        res.locals.user = user;
      } else {
        // couldn't find it... that's weird. clear the session
        req.session.user = null;
      }

      next(err);
    });
  }
});

app.use(flash());


//Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(layouts);


//Routes
app.use(userRoutes);
app.use(adminRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});