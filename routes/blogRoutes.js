//NPM Modules - No relative path as they are in node_modules
const express = require("express");
const router = express.Router();

//These are my own modules that require a relative path to find them.
const blogController = require("../controllers/blogController");

//We are calling two functions on router in this case they are both .get(), which is the HTTP verb, and that takes 2 arguments.
//1 is the path (from the url), the 2nd is the function to call
router.get("/", blogController.indexPost);

router.route("/:id")
    .get(blogController.showPost)
    .put(blogController.addComment);



// router.post("/", blogController.addComment);


//Exporting the router object
module.exports = router;