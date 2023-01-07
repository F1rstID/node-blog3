const PostRepository = require('../repositories/posts.repository');
const { Post, User, Like } = require('../models');
const { resCreater } = require('../helper/express.helper');
const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

class PostService {
  postRepository = new PostRepository(Post, User, Like);
  // 게시글 작성
  createPost = async (req, res) => {
    try {
      const resultSchema = postSchema.validate(req.body);

      if (resultSchema.error) {
        return resCreater(false, 412, '데이터 형식이 올바르지 않습니다.');
      }

      const { title, content } = resultSchema.value;

      const userId = res.locals.user;

      if (!userId) {
        return resCreater(false, 412, '로그인이 필요한 기능입니다.');
      }

      if (!title) {
        return resCreater(
          false,
          412,
          '게시글 제목의 형식이 일치하지 않습니다.'
        );
      }

      if (!content) {
        return resCreater(
          false,
          412,
          '게시글 내용의 형식이 일치하지 않습니다.'
        );
      }

      await this.postRepository.createPost(userId, title, content);
      return resCreater(true, 201, '게시글 작성에 성공하였습니다.');
    } catch {
      return resCreater(false, 410, '게시글 작성에 실패하였습니다.');
    }
  };
  // 게시글 전체 조회
  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    return JSON.parse(JSON.stringify(allPost)).map((post) => ({
      postId: post.postId,
      userId: post.User.userId,
      nickname: post.User.nickname,
      title: post.title,
      createdAt: new Date(post.createdAt).toLocaleString('ko'),
      updatedAt: new Date(post.updatedAt).toLocaleString('ko'),
      likes: post.likes,
    }));
  };
  // 게시글 상세 조회
  findPostById = async (postId) => {
    const post = await this.postRepository.findPostById(postId);
    const postData = JSON.parse(JSON.stringify(post));
    return {
      postId: postData.postId,
      userId: postData.User.userId,
      nickname: postData.User.nickname,
      title: postData.title,
      content: postData.content,
      createdAt: new Date(postData.createdAt).toLocaleString('ko'),
      updatedAt: new Date(postData.updatedAt).toLocaleString('ko'),
      likes: postData.likes,
    };
  };
  // 게시글 수정
  updatePost = async (req, res) => {
    try {
      const resultSchema = postSchema.validate(req.body);

      if (resultSchema.error) {
        return resCreater(false, 412, '데이터 형식이 올바르지 않습니다.');
      }

      const { postId } = req.params;
      const { title, content } = resultSchema.value;

      if (!title) {
        return resCreater(
          false,
          412,
          '게시글 제목의 형식이 일치하지 않습니다.'
        );
      }

      if (!content) {
        return resCreater(false, 412, '게시글 내용의 형식이 않습니다.');
      }

      const userId = res.locals.user;
      const findUserIdData = await this.postRepository.findPostByPk(postId);
      const findUserId = JSON.parse(JSON.stringify(findUserIdData)).User.userId;

      if (userId !== findUserId) {
        return resCreater(false, 412, '게시글을 수정할 권한이 없습니다..');
      }

      const updatePostData = await this.postRepository.updatePost(
        postId,
        title,
        content
      );

      if (updatePostData < 1) {
        return resCreater(
          false,
          412,
          '게시글이 정상적으로 수정되지 않았습니다..'
        );
      }
      return resCreater(true, 200, '게시글을 수정하였습니다.');
    } catch (err) {
      return resCreater(false, 400, '게시글 수정에 실패하였습니다.');
    }
  };
  // 게시글 삭제
  deletePost = async (req, res) => {
    const { postId } = req.params;

    const postData = await this.postRepository.findPostById(postId);
    const post = JSON.parse(JSON.stringify(postData));
    const userId = res.locals.user;

    if (!postData) {
      return resCreater(false, 404, '게시글이 존재하지 않습니다.');
    }

    if (post.User.userId !== userId) {
      return resCreater(false, 401, '게시글을 삭제할 권한이 없습니다.');
    }

    const deletePostData = await this.postRepository.deletePost(postId);

    if (deletePostData < 1) {
      return resCreater(false, 401, '게시글이 삭제되지 않았습니다.');
    }

    return resCreater(true, 200, '게시글이 삭제되었습니다.');
  };
}

module.exports = PostService;
