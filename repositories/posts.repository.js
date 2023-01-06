const { sequelize } = require('../models');

class PostRepository {
  // 의존성 주입
  constructor(PostsModel) {
    this.postsModel = PostsModel;
  }
  // 코드 작성부

  findAllPost = async () => {
    // 게시글 전체조회
    const posts = await this.postsModel.findAll({
      attributes: [
        'postId',
        'title',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
      ],
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Likes,
          attributes: [],
          require: false,
        },
      ],
    });
    // 게시글 전체조회 map으로 다듬기

    return posts;
  };
}

module.exports = PostRepository;
