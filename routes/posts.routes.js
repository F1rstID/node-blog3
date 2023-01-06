const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPost);
router.post('/', postsController.posting);
router.put('/:postId', postsController.editPost);
router.delete('/:postId', postsController.deletePost);

module.exports = router;
