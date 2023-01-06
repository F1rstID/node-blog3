const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

const tokenValidateMiddleware = require('../middleware/tokenValidateMiddleware');

router.get('/:postId', commentsController.getComments);
router.post(
  '/:postId',
  tokenValidateMiddleware,
  commentsController.craeteComment
);
router.put(
  '/:commentId',
  tokenValidateMiddleware,
  commentsController.updateComment
);
router.delete(
  '/:commentId',
  tokenValidateMiddleware,
  commentsController.deleteComment
);

module.exports = router;
