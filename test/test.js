const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const assert = require('chai').assert;
const Functions = require("../functions");
const func = new Functions();
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);


describe("Admin", () => {

    it("should create a blog post", (done) => {
        let array1 = [{ blogTitle: "Blog1", blogContent: "Blog Content 1" }, { blogTitle: "Blog2", blogContent: "Blog Content 2" }];
        func.createBlog(array1)
            .then(result => {
                expect(array1).to.include({ blogTitle: "Blog3", blogContent: "Blog Content 3" });
                done();
            })
    });

    it("should delete a blog post", (done) => {
        let array2 = [{ blogTitle: "Blog1", blogContent: "Blog Content 1" }, { blogTitle: "Blog2", blogContent: "Blog Content 2" }, { blogTitle: "Blog3", blogContent: "Blog Content 3" }];
        func.deleteBlog(array2)
            .then(result => {
                expect(array2).to.have.length(2);
                done();
            })
    });
});

describe("User", () => {

    it("should show one blog posts", (done) => {
        func.showOneBlog("foobar")
            .then(result => {
                expect(result).to.contain("foo");
                done();
            })
    });

    it("should add a comment to a blog post", (done) => {
        let comments = [{ comment1: "Comment1", comment2: "Comment2" }, { comment1: "Comment1", comment2: "Comment2" }];
        func.addComment(comments)
            .then(result => {
                expect(comments).to.include({ comment1: "Comment3", comment2: "Comment3" });
                done();
            })
    });
});

const Blog = require("../models/blog");
const Comment = require("../models/comment");

describe("Models", () => {
    it("should create a blog object", (done) => {
        let newBlog = {
            blogTitle: "Blog title 3",
            blogContent: "Blog content"
        }
        let blogPost = new Blog(newBlog);
        assert.isObject(blogPost, "it is an object");
        done();
    })


    it("should create a comment object", (done) => {
        let newComment = {
            comment: "Test comment"
        }
        let testComment = new Comment(newComment);
        assert.isObject(testComment, "it is an object");
        done();
    })

});
