const express = require('express')
const { body } = require('express-validator')
const router = express.Router();

const feedController = require('../controller/feed')

// GET => /feed/posts
router.get('/posts', feedController.getPosts)
router.get('/post/:postId', feedController.getPost)

// POST => /feed/posts
router.post('/posts', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feedController.createPost)

// put => /feed/post
router.put('/post/:postId', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feedController.updatePost)

// delete

router.delete('/post/:postId', feedController.deletePost)

module.exports = router;