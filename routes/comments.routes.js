const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/:postId', commentsController.getComments);
router.post('/:postId', commentsController.craeteComment);

module.exports = router;
