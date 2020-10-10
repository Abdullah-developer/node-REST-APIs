const express = require('express')
const router = express.Router();

const feed_controller = require('../controller/feed')

// GET => /feed/posts
router.get('/posts', feed_controller.getPosts)
// POST => /feed/posts
router.post('/posts', feed_controller.createPost)

module.exports = router;