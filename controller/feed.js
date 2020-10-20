const fs = require('fs')
const path = require('path')

const { validationResult } = require('express-validator')
const Post = require('../model/post.js')

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => console.log(err))
}

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalCount;
    Post.find().countDocuments().then(document_count => {
        totalCount =  `${2 * currentPage - 1} ${document_count < 2 * currentPage ? "" : 2 * currentPage} From ${document_count}`
        return Post.find().skip((currentPage - 1) * perPage).limit(perPage)
    }).then(posts => {
            res.status(200).json({ posts, totalPost: totalCount})
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error)
        })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById({ _id: postId }).then(post => {
        if (!post) {
            const error = new Error('there is no post with this id');
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({ post })
    }).catch(error => {
        console.log(error)
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    })
}

exports.createPost = (req, res, next) => {
    // Validation Result if Error is Occured
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No Image Provided.');
        error.statusCode = 422;
        throw error;
    }
    // creating post class with data from the user
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: {
            name: req.body.name
        },
        image: req.file.path.replace("\\" ,"/")
    });
    // saving the post to the database
    post.save().then(postData => {
        res.status(201).json({
        message: "Post Created Succefully",
        post: postData
        })
    }).catch(error =>  {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
}

exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title
    const content = req.body.content
    let image = req.body.image

    if (req.file) {
        image = req.file.path.replace("\\" ,"/")
    }
    
    if (!image) {
        const error = new Error('No File Picked. !!');
        error.statusCode = 422;
        throw error;
    }

    Post.findById(postId).then(post => {

        if (!post) {
            const error = new Error('there is no post with this id');
            error.statusCode = 404;
            throw error
        }
        if (image !== post.image) {
            clearImage(post.image)
        }
        post.title = title;
        post.content = content;
        post.image = image;
        // post.creator = {name: req.body.name};
        return post.save()
    }).then(result => {
        res.status(200).json({message: "Post Updated!!", result})
    }).catch(error =>  {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    console.log(postId)
    Post.findById(postId).then(post => {
        console.log(post)
        if (!post) {
            const error = new Error('There is no post with this id');
            error.statusCode = 422;
            throw error;
        }
        clearImage(post.image)
        return Post.findByIdAndRemove(postId)
        }).then(result => {
            console.log(result)
            res.status(200).json({message: 'Post Deleted !!!'})
        }).catch(error =>  {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        })
}