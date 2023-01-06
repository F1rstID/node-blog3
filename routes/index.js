const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const postsRouter = require('./posts.routes');
const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const commentsRouter = require('./comments.routes');

router.use(cookieParser());
router.use(express.json());

router.use('/posts', postsRouter);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/comments', commentsRouter);

module.exports = router;
