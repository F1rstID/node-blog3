const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/:postId', commentsController.getComments);
router.post('/:postId', commentsController.craeteComment);
router.put('/:commentId', commentsController.updateComment);

module.exports = router;
