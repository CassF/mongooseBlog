const Blog = require("../models/blog");
const Comment = require("../models/comment")

class BlogController {
  // INDEX - GET /
  static indexPost(req, res) {

    Blog.find({}, function (err, blogs) {

      //check for errors anf return 500 error and message if found
      if (err) return res.status(500).send(err);

      res.render("userBlog/userHome", {
        title: "Blogs",
        blogs: blogs
      });
    });
  }

  // SHOW - GET /:id
  static showPost(req, res) {

    Blog.findById(req.params.id, function (err, blog) {

      //check for errors or for no object found
      if (!blog) return res.status(484).send("Not Found");
      if (err) return res.status(500).send(err);

      res.render("userBlog/userShow", {
        title: "Blog",
        blog: blog
      });
    })

  }

  //ADD COMMENT - UPDATE /:id
  static addComment(req, res) {
    console.log("adding comment");
    //or $set
    Blog.update({_id:req.params.id}, { $push: { "comments":{"subject": req.body.subject, "comment": req.body.comment }}}, function (err, post) {
      if (err) return res.status(500).send(err);
      // redirect the user to a GET route. We'll go back to the INDEX.
      res.redirect("/");

    });
  }

}

//Exporting the BlogController class
// export all our controller functions in an object
module.exports = BlogController;