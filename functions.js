class Functions {

    createBlog(array1) {
        return new Promise(
            (resolve) => {
                resolve(array1.push({ blogTitle: "Blog3", blogContent: "Blog Content 3" }));
            }
        )
    }

    deleteBlog(array2) {
        return new Promise(
            (resolve) => {
                resolve(array2.splice(2, 1));
            }
        )
    }

    showOneBlog(aString) {
        return new Promise(
            (resolve) => {
                resolve(aString);
            }
        )
    }

    addComment(comments) {
        return new Promise(
            (resolve) => {
                resolve(comments.push({ comment1: "Comment3", comment2: "Comment3" }));
            }
        )
    }
};

module.exports = Functions;