//NPM Modules - No relative path as they are in node_modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const layouts = require('express-ejs-layouts');
const session = require("express-session");
const methodOverride = require('method-override');
const mongoose = require('mongoose'); 

//These are my own modules that require a relative path to find them
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

//connect to the database
mongoose.connect('mongodb://localhost/blogs');

//View Engine
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(layouts);

// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}));

//Routes
app.use(adminRoutes);
app.use(blogRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});