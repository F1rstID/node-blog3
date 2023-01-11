const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const postsRouter = require('./posts.routes');
const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const commentsRouter = require('./comments.routes');
const likesRouter = require('./likes.routes');

const notfound = require('../middleware/nofounderror.middleware')

router.use(cookieParser());
router.use(express.json());

router.use((req, res, next) => {
  console.log(req.ip, req.originalUrl)
  next()
})

router.use('/posts', likesRouter, postsRouter);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/comments', commentsRouter);

router.use((req, res, next) => {
  res.status(404).json({ errorMessage: '404 Not Found' })
})

module.exports = router;
