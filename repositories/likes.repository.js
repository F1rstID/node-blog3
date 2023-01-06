class LikesRepository {
  constructor(LikeModel, PostModel, UserModel) {
    this.likeModel = LikeModel;
    this.postModel = PostModel;
    this.userModel = UserModel;
  }
  findLikeId = async (postId, userId) => {
    const findLikeIdData = await this.likeModel.findOne({
      where: { postId, userId },
      attributes: ['likeId'],
    });
    return findLikeIdData;
  };

  createLike = async (postId, userId) => {
    const createLikeData = await this.likeModel.create({
      postId,
      userId,
    });
    return createLikeData;
  };

  deleteLike = async (likeId) => {
    const deleteLikeData = await this.likeModel.destroy({
      where: { likeId },
    });
    return deleteLikeData;
  };
}

module.exports = LikesRepository;
