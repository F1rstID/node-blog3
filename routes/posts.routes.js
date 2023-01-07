const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

const tokenValidateMiddleware = require('../middleware/tokenValidateMiddleware');


router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPost);
router.post('/', tokenValidateMiddleware, postsController.posting);
router.put('/:postId', tokenValidateMiddleware, postsController.updatePost);
router.delete('/:postId', tokenValidateMiddleware, postsController.deletePost);

module.exports = router;
