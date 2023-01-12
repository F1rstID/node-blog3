require('express-async-errors');
const { InternalServerError } = require('../helper/error.handling.helper');

class LikesRepository {
  constructor(LikeModel, PostModel, UserModel) {
    this.likeModel = LikeModel;
    this.postModel = PostModel;
    this.userModel = UserModel;
  }

  findLikedPosts = async (userId) => {
    try {
      const likedPostsData = await this.likeModel.findAll({
        where: { userId },
        include: [
          {
            model: this.postModel,
            attributes: ['title', 'createdAt', 'updatedAt'],
            include: [
              {
                model: this.likeModel,
                required: false,
                attributes: ['userId'],
              },
            ],
          },
          {
            model: this.userModel,
            attributes: ['nickname'],
          },
        ],
        attributes: ['postId'],
        order: [['createdAt', 'DESC']],
      });
      return likedPostsData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  findLikeId = async (postId, userId) => {
    try {
      const findLikeIdData = await this.likeModel.findOne({
        where: { postId, userId },
        attributes: ['likeId'],
      });
      return findLikeIdData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  createLike = async (postId, userId) => {
    try {
      const createLikeData = await this.likeModel.create({
        postId,
        userId,
      });
      return createLikeData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  deleteLike = async (likeId) => {
    try {
      const deleteLikeData = await this.likeModel.destroy({
        where: { likeId },
      });
      return deleteLikeData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };
}

module.exports = LikesRepository;
