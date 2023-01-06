const PostService = require('../services/posts.services');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };
}

module.exports = PostsController;