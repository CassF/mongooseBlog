const Blog = require("../models/blog");


class AdminController {

// INDEX - GET /admin
static indexAdmin(req, res) {

  Blog.find({}, function (err, blogs) {

    //check for errors anf return 500 error and message if found
    if (err) return res.status(500).send(err);
    console.log(blogs);
    res.render("adminBlog/adminHome", {
      title: "Blogs",
      blogs: blogs
    });
  });

}

// NEW - GET /new
static newPost(req, res) {

    // create an empty post
    let newBlog = {
        id: "",
        title: "",
        body: ""
    }

    res.render("adminBlog/adminCreate", {
        title: "New Blog",
        blog: newBlog
    });

}

//QUICKER WAY - CREATE - POST /admin
static createPost(req, res) {

  //ask mongoose to save the data for us and wait for the response
  Blog.create(req.body, function (err, post) {
    //check for errors anf return 500 error and message if found
    if (err) return res.status(500).send(err);
    // redirect the user to a GET route. We'll go back to the INDEX.
    res.redirect("/admin");
  });
}

// SHOW - GET /admin/:id
static showPost(req, res) {

  Blog.findById(req.params.id, function (err, blog) {

    //check for errors or for no object found
    if (!blog) return res.status(484).send("Not Found");
    if (err) return res.status(500).send(err);

    res.render("adminBlog/adminShow", {
      title: "Blog",
      blog: blog
    });
  })

}

// UPDATE - UPDATE /admin/:id
static updatePost(req, res) {

  Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, post) {
    if (err) return res.status(500).send(err);
    // redirect the user to a GET route. We'll go back to the INDEX.
    res.redirect("/admin");

  });

}

// DELETE - DELETE /admin/:id
static deletePost(req, res) {

  Blog.findByIdAndRemove(req.params.id, function (err) {
    
    if (err) return res.status(500).send(err);
    // redirect to a GET request
    res.redirect("/admin");

  });

}

// EDIT - GET /:id/edit
static editPost(req, res) {

  Blog.findById(req.params.id, function (err, blog) {

    //check for errors or for no object found
    if (!blog) return res.status(484).send("Not Found");
    if (err) return res.status(500).send(err);

    res.render("adminBlog/adminEdit", {
      title: "Edit Blog",
      blog: blog
    });
  })
}

}
// export all our controller functions in an object
module.exports = AdminController;