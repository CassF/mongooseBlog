//NPM Modules - No relative path as they are in node_modules
const express = require("express");
const router = express.Router();

//These are my own modules that require a relative path to find them.
const adminController = require("../controllers/adminController");




router.route('/admin')
    .get(adminController.indexAdmin)
    .post(adminController.createPost);

router.route("/new")
    .get(adminController.newPost)

router.route('/admin/:id')
    .get(adminController.showPost)
    .put(adminController.updatePost)
    .delete(adminController.deletePost);

// router.route("/:id/reply")
//     .get(adminController.addReply)
//     .put(adminController.createReply);

router.route('/:id/edit')
    .get(adminController.editPost)



//Exporting the router object
module.exports = router;