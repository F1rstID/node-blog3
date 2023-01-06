const LikesRepository = require('../repositories/likes.repository');
const { Like, Post, User } = require('../models');

class LikesService {
  likesRepository = new LikesRepository(Like, Post, User);

  likeEvent = async (postId, userId) => {
    const likeId = await this.likesRepository.findLikeId(postId, userId);

    if (likeId) {
      // 좋아요 되어 있는 상태
      await this.likesRepository.deleteLike(likeId.likeId);
      return {
        message: '좋아요 취소함 !',
      };
    }
    if (!likeId) {
      // 좋아요 되어 있지 않은 상태
      await this.likesRepository.createLike(postId, userId);
      return {
        message: '좋아요 했음',
      };
    }
  };

  //
}

module.exports = LikesService;
