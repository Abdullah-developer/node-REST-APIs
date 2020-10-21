const express = require('express')
const { body } = require('express-validator')
const router = express.Router();

const feedController = require('../controller/feed')
const isAuth = require('../middleware/is-auth')

// GET => /feed/posts
router.get('/posts', isAuth, feedController.getPosts)
router.get('/post/:postId', isAuth, feedController.getPost)

// POST => /feed/posts
router.post('/posts', isAuth, [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feedController.createPost)

// put => /feed/post
router.put('/post/:postId', isAuth, [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feedController.updatePost)

// delete

router.delete('/post/:postId', isAuth, feedController.deletePost)

module.exports = router;