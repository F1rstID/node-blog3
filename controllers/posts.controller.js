const PostsService = require('../services/posts.service');

class PostsController {
  postsService = new PostsService();
  // 게시글 작성
  posting = async (req, res) => {
    const createPostData = await this.postsService.createPost(req, res);

    if (createPostData.success) {
      return res
        .status(createPostData.statusCode)
        .json({ message: createPostData.message });
    }

    return res
      .status(createPostData.statusCode)
      .json({ errorMessage: createPostData.errorMessage });
  };
  // 게시글 전체 조회
  getPosts = async (req, res) => {
    try {
      const posts = await this.postsService.findAllPost();
      res.status(200).json({ data: posts });
    } catch {
      res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };
  // 게시글 상세 조회
  getPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.findPostById(postId);

      res.status(200).json({ data: post });
    } catch {
      res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };
  // 게시글 수정
  updatePost = async (req, res) => {
    const updateData = await this.postsService.updatePost(req, res);
    console.log(updateData);
    if (updateData.success) {
      return res
        .status(updateData.statusCode)
        .json({ message: updateData.message });
    }
    return res
      .status(updateData.statusCode)
      .json({ errorMessage: updateData.errorMessage });
  };
  // 게시글 삭제
  deletePost = async (req, res) => {
    const deletePostdata = await this.postsService.deletePost(req, res);
    if (deletePostdata.success) {
      return res
        .status(deletePostdata.statusCode)
        .json({ message: deletePostdata.message });
    }
    return res
      .status(deletePostdata.statusCode)
      .json({ errorMessage: deletePostdata.errorMessage });
  };
}

module.exports = PostsController;
