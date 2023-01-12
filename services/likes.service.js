/* eslint-disable consistent-return */
const LikesRepository = require('../repositories/likes.repository');
const { Like, Post, User } = require('../models');
const { resCreater } = require('../helper/express.helper');
const { BadRequestError } = require('../helper/error.handling.helper');

class LikesService {
  likesRepository = new LikesRepository(Like, Post, User);

  likeEvent = async (postId, userId) => {
    try {
      const likeId = await this.likesRepository.findLikeId(postId, userId);

      if (likeId) {
        // 좋아요 되어 있는 상태
        await this.likesRepository.deleteLike(likeId.likeId);
        return resCreater(true, 201, '좋아요를 취소하였습니다.');
      }
      if (!likeId) {
        // 좋아요 되어 있지 않은 상태
        await this.likesRepository.createLike(postId, userId);
        return resCreater(true, 201, '좋아요를 등록하였습니다.');
      }
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };

  findLikedPosts = async (userId) => {
    const findLikedPostsData = await this.likesRepository.findLikedPosts(
      userId,
    );
    return findLikedPostsData;
  };

  //
}

module.exports = LikesService;
