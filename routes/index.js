const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const postsRouter = require('./posts.routes');
const signupRouter = require('./signup.routes');

router.use(cookieParser());
router.use(express.json());

router.use('/posts', postsRouter);
router.use('/signup', signupRouter);

module.exports = router;
