const PostService = require('../services/posts.service');
const { verifyJWT } = require('../helper/jwt.helper');

class PostsController {
  postService = new PostService();

  posting = async (req, res) => {
    const { Authorization } = req.cookies;
    const { title, content } = req.body;
    const payload = Authorization.split(' ')[1];
    const token = verifyJWT(payload, process.env.SECRETKEY);

    if (token === false) {
      return res
        .status(412)
        .json({ errorMessage: '유효하지 않은 토큰입니다.' });
    }
    await this.postService.createPost(token.userId, title, content);
    res.status(201).json({ message: '작성' });
  };

  getPosts = async (req, res) => {
    const posts = await this.postService.findAllPost();
    res.status(200).json({ data: posts });
  };

  getPost = async (req, res) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };
  editPost = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      title,
      content
    );
    res.status(201).json(updatePost);
  };
}

module.exports = PostsController;
