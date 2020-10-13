const { validationResult } = require('express-validator')
const Post = require('../model/post.js')

exports.getPosts = (req, res) => {
    res.status(200).json({posts: [{
        _id: new Date().getTime(),
        title: "First Post", 
        content: "content of the first post",
        creator: {
            name: "Abdullah Hussien"
        },
        createdAt: new Date().toLocaleString(),
    }]
})
}
exports.createPost = (req, res) => {
    // Validation Result if Error is Occured
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    // creating post class with data from the user
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: {
            name: req.body.creator.name
        },
    });
    // saving the post to the database
    post.save().then(postData => {
        res.status(201).json({
        message: "Post Created Succefully",
        post: postData
        })
    }).catch(err =>  {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}