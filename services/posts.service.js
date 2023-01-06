const PostRepository = require('../repositories/posts.repository');
const { Post, User, Like } = require('../models');

class PostService {
  postRepository = new PostRepository(Post, User, Like);
  // 게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = this.postRepository.createPost(
      userId,
      title,
      content
    );
    return createPostData;
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
  //
  findPostById = async (postId) => {
    const findPostByPk = await this.postRepository.findPostById(postId);
    return findPostByPk;
  };
  // 게시글 수정
  updatePost = async (postId, title, content) => {
    const updatePostData = await this.postRepository.updatePost(
      postId,
      title,
      content
    );
    return updatePostData;
  };
  // 게시글 삭제
  deletePost = async (postId) => {
    const deletePostData = await this.postRepository.deletePost(postId);
    return deletePostData;
  };
}

module.exports = PostService;
