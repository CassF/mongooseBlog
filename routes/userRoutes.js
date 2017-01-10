//NPM Modules - No relative path as they are in node_modules
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");
const sessionsController = require("../controllers/sessions");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = require("../app");
const jwt = require('jsonwebtoken');

//These are my own modules that require a relative path to find them.
const blogController = require("../controllers/blogController");

// add support for cookies
app.use(cookieParser());

// add support for sessions
app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: 'blogsecretkey'
}));


// sessions
router.route('/sessions')

      .post(sessionsController.create)
      .delete(sessionsController.delete);

router.route('/sessions/new')
      .get(sessionsController.new);

router.route('/register')
      .get(usersController.newUser)
      .post(usersController.createUser);


//We are calling two functions on router in this case they are both .get(), which is the HTTP verb, and that takes 2 arguments.
//1 is the path (from the url), the 2nd is the function to call

router.route("/")
      .get(blogController.indexPost)

router.route("/:id")
      .get(blogController.showPost)
      //redirects to the login page after successful login
      //should redirect to index page.
      .put(blogController.addComment);

// router.post("/", blogController.addComment);


//Exporting the router object
module.exports = router;

function authCheck(req, res, next) {
      if (!req.session.token) {
            console.log("Here1");
            res.redirect('/sessions/new');
      } else {
            console.log("Here");
            let token = req.session.token;
            jwt.verify(token, "scribblToken", function (err, decoded) {
                  if (err) {
                        res.redirect('/sessions/new');
                  } else {
                        req.decoded = decoded;
                        next();
                  }
            });
      }
}