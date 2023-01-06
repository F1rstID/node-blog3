const PostRepository = require('../repositories/posts.repository');
const { Posts } = require('../models');

class PostService {
  postRepository = new PostRepository(Posts);

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => b.createdAt - a.createdAt);

    return allPost.map((post) => ({
      postId: post.postId,
      userId: post.userId,
      nickname: post.nickname,
      title: post.title,
      createdAt: new Date(post.createdAt).toLocaleString('ko'),
      updatedAt: new Date(post.updatedAt).toLocaleString('ko'),
    }));
  };
}

module.exports = PostService;
