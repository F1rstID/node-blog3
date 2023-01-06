const { sequelize } = require('../models');

class PostRepository {
  // 의존성 주입
  constructor(PostsModel, UserModel, LikeModel) {
    this.postModel = PostsModel;
    this.userModel = UserModel;
    this.likeModel = LikeModel;
  }
  // 게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = await this.postModel.create({
      userId,
      title,
      content,
    });
  };
  // 게시글 전체 조회
  findAllPost = async () => {
    // 게시글 전체조회
    const posts = await this.postModel.findAll({
      attributes: [
        'postId',
        'title',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
      ],
      include: [
        {
          model: this.userModel,
          attributes: ['userId', 'nickname'],
        },
        {
          model: this.likeModel,
          attributes: [],
          require: false,
        },
      ],
      group: ['Post.postId'],
      order: [['createdAt', 'DESC']],
      // raw: true,
    });

    return posts;
  };
  // 게시글 상세 조회
  findPostById = async (postId) => {
    const post = await this.postModel.findOne({
      attributes: [
        'postId',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
      ],
      where: { postId },
      include: [
        {
          model: this.userModel,
          attributes: ['userId', 'nickname'],
        },
        {
          model: this.likeModel,
          attributes: [],
          require: false,
        },
      ],
      group: ['Post.postId'],
      order: [['createdAt', 'DESC']],
    });

    return post;
  };
  // 게시글 수정
  updatePost = async (postId, title, content) => {
    const updatePostData = await this.postModel.update(
      { title, content },
      { where: { postId } }
    );
    return updatePostData;
  };
  // 게시글 삭제
  deletePost = async (postId) => {
    const deletePostData = await this.postModel.destroy({
      where: { postId },
    });
    return deletePostData;
  };
}

module.exports = PostRepository;
