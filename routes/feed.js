const express = require('express')
const router = express.Router();

const feed_CONTROLLER = require('../controller/feed')

router.get('/posts', feed_CONTROLLER.getPosts)

module.exports = router;