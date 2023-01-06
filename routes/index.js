const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.routes');
const cookieParser = require('cookie-parser');


router.use(cookieParser());
router.use(express.json());
router.use('/posts', postsRouter);

module.exports = router;
