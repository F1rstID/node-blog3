const PostsService = require('../services/posts.service');
const Joi = require('joi');
const { getDecodedPayload } = require('../helper/jwt.helper');

class PostsController {
  postsService = new PostsService();
  // 게시글 작성
  posting = async (req, res) => {
    try {
      const postSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      });

      const resultSchema = postSchema.validate(req.body);

      if (resultSchema.error) {
        return res
          .status(412)
          .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
      }

      const { title, content } = resultSchema.value;

      const userId = res.locals.user;

      if (!userId) {
        return res
          .status(412)
          .json({ errorMessage: '로그인이 필요한 기능입니다..' });
      }

      if (!title) {
        return res
          .status(412)
          .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
      }

      if (!content) {
        return res
          .status(412)
          .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
      }
      await this.postsService.createPost(userId, title, content);
      res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
    } catch {
      res.status(400).json({ message: '게시글 작성에 실패하였습니다.' });
    }
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
    try {
      const postSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      });

      const resultSchema = postSchema.validate(req.body);

      if (resultSchema.error) {
        return res
          .status(412)
          .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
      }

      const { postId } = req.params;
      const { title, content } = resultSchema.value;

      if (!title) {
        return res
          .status(412)
          .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
      }

      if (!content) {
        return res
          .status(412)
          .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
      }

      const userId = res.locals.user;
      const findUserIdData = await this.postsService.findPostById(postId);
      const findUserId = JSON.parse(JSON.stringify(findUserIdData)).User.userId;
      console.log(findUserId);

      if (userId !== findUserId) {
        return res
          .status(401)
          .json({ errorMessage: '게시글을 수정할 권한이 없습니다.' });
      }

      const updatePost = await this.postsService.updatePost(
        postId,
        title,
        content
      );

      if (updatePost < 1) {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
      }
      return res.status(401).json({ errorMessage: '게시글을 수정하였습니다' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다' });
    }
  };
  // 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;

    const postData = await this.postsService.findPostById(postId);
    const post = JSON.parse(JSON.stringify(postData));
    const userId = res.locals.user;

    if (!postData) {
      return res
        .status(404)
        .json({ errorMessage: '게시글이 존재하지 않습니다.' });
    }

    if (post.User.userId !== userId) {
      return res
        .status(401)
        .json({ errorMessage: '게시글을 삭제할 권한이 없습니다.' });
    }

    const deletePost = await this.postsService.deletePost(postId);

    if (deletePost < 1) {
      return res
        .status(401)
        .json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
    }

    return res.status(200).json({ message: '게시글을 삭제하였습니다.' });
  };
}

module.exports = PostsController;
