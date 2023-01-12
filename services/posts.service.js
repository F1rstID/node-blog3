const PostRepository = require('../repositories/posts.repository');
const { Post, User, Like } = require('../models');
const { resCreater } = require('../helper/express.helper');
const {
  BadRequestError, PreconditionFailed, NotFound, Unauthorized,
} = require('../helper/error.handling.helper');

class PostService {
  postRepository = new PostRepository(Post, User, Like);

  // 게시글 작성
  createPost = async (userId, title, content) => {
    try {
      if (!userId) throw new Unauthorized('로그인이 필요한 기능입니다..');

      if (!title) throw new PreconditionFailed('게시글 제목의 형식이 일치하지 않습니다.');

      if (!content) throw new PreconditionFailed('게시글 내용의 형식이 일치하지 않습니다.');

      await this.postRepository.createPost(userId, title, content);
      return resCreater(true, 201, '게시글 작성에 성공하였습니다.');
    } catch {
      throw new BadRequestError('게시글 작성에 실패하였습니다.');
    }
  };

  // 게시글 전체 조회
  findAllPost = async () => {
    try {
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
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };

  // 게시글 상세 조회
  findPostById = async (postId) => {
    try {
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
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };

  // 게시글 수정
  updatePost = async (postId, userId, title, content) => {
    try {
      if (!title) throw new PreconditionFailed('게시글 제목의 형식이 일치하지 않습니다.');

      if (!content) throw new PreconditionFailed('게시글 내용의 형식이 일치하지 않습니다.');

      const findUserIdData = await this.postRepository.findPostByPk(postId);
      const findUserId = JSON.parse(JSON.stringify(findUserIdData)).User.userId;

      if (userId !== findUserId) throw new Unauthorized('게시글을 수정할 권한이 없습니다.');

      const updatePostData = await this.postRepository.updatePost(
        postId,
        title,
        content,
      );

      if (updatePostData < 1) throw new Unauthorized('게시글이 정상적으로 수정되지 않았습니다.');

      return resCreater(true, 200, '게시글을 수정하였습니다.');
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };

  // 게시글 삭제
  deletePost = async (postId, userId) => {
    const postData = await this.postRepository.findPostById(postId);
    const post = JSON.parse(JSON.stringify(postData));

    if (!postData) { throw new NotFound('게시글이 존재하지 않습니다.'); }

    if (post.User.userId !== userId) throw new Unauthorized('게시글을 삭제할 권한이 없습니다.');

    const deletePostData = await this.postRepository.deletePost(postId);

    if (deletePostData < 1) { throw new Unauthorized('게시글이 삭제되지 않았습니다.'); }

    return resCreater(true, 200, '게시글이 삭제되었습니다.');
  };
}

module.exports = PostService;
