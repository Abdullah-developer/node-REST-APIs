const express = require('express')
const { body } = require('express-validator')
const router = express.Router();

const feed_controller = require('../controller/feed')

// GET => /feed/posts
router.get('/posts', feed_controller.getPosts)
router.get('/post/:postId', feed_controller.getPost)

// POST => /feed/posts
router.post('/posts', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feed_controller.createPost)

// put => /feed/post
router.put('/post/:postId', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feed_controller.updatePost)

// delete

router.delete('/post/:postId', feed_controller.deletePost)

module.exports = router;