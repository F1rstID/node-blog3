const PostsService = require('../services/posts.service');
const { verifyJWT } = require('../helper/jwt.helper');

class PostsController {
  postsService = new PostsService();
  // 게시글 작성
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
    await this.postsService.createPost(token.userId, title, content);
    res.status(201).json({ message: '작성' });
  };
  // 게시글 전체 조회
  getPosts = async (req, res) => {
    const posts = await this.postsService.findAllPost();
    res.status(200).json({ data: posts });
  };
  // 게시글 상세 조회
  getPost = async (req, res) => {
    const { postId } = req.params;
    const post = await this.postsService.findPostById(postId);

    res.status(200).json({ data: post });
  };
  // 게시글 수정
  updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await this.postsService.updatePost(
      postId,
      title,
      content
    );
    res.status(201).json(updatePost);
  };
  // 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;
    const deletePost = await this.postsService.deletePost(postId);
    return res.status(201).json(deletePost);
  };
}

module.exports = PostsController;
