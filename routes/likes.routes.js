const express = require('express');

const router = express.Router();

const LikesController = require('../controllers/likes.controller');

const likesController = new LikesController();

const tokenValidateMiddleware = require('../middleware/tokenValidateMiddleware');

router.put('/:postId/like', tokenValidateMiddleware, likesController.likeEvent);
router.get('/like', tokenValidateMiddleware, likesController.findLikedPosts);

module.exports = router;
