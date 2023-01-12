const Joi = require('joi');
const PostsService = require('../services/posts.service');
const { PreconditionFailed } = require('../helper/error.handling.helper');
require('express-async-errors');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

class PostsController {
  postsService = new PostsService();

  // 게시글 작성
  posting = async (req, res) => {
    const resultSchema = postSchema.validate(req.body);

    if (resultSchema.error) { throw new PreconditionFailed('데이터 형식이 올바르지 않습니다..'); }

    const { title, content } = resultSchema.value;

    const userId = res.locals.user;

    const createPostData = await this.postsService.createPost(userId, title, content);

    if (createPostData.success) {
      return res
        .status(createPostData.statusCode)
        .json({ message: createPostData.message });
    }
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
    const resultSchema = postSchema.validate(req.body);

    if (resultSchema.error) throw new PreconditionFailed('데이터 형식이 올바르지 않습니다.');

    const userId = res.locals.user;
    const { postId } = req.params;
    const { title, content } = resultSchema.value;

    const updateData = await this.postsService.updatePost(postId, userId, title, content);

    if (updateData.success) {
      return res
        .status(updateData.statusCode)
        .json({ message: updateData.message });
    }
  };

  // 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.user;

    const deletePostdata = await this.postsService.deletePost(postId, userId);
    if (deletePostdata.success) {
      return res
        .status(deletePostdata.statusCode)
        .json({ message: deletePostdata.message });
    }
  };
}

module.exports = PostsController;
