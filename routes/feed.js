const express = require('express')
const { body } = require('express-validator')
const router = express.Router();

const feed_controller = require('../controller/feed')

// GET => /feed/posts
router.get('/posts', feed_controller.getPosts)
// POST => /feed/posts
router.post('/posts', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feed_controller.createPost)

module.exports = router;