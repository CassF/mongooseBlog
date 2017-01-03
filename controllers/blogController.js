const Blog = require("../models/blog");
// const Comments = require("../models/comment")

// INDEX - GET /
function indexPost(req, res) {

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
function showPost(req, res) {

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



//Exporting the BlogController class
// export all our controller functions in an object
module.exports = {

  index: indexPost,
  show: showPost

}