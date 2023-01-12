/* eslint-disable consistent-return */
const LikesService = require('../services/likes.service');
require('express-async-errors');

class LikesController {
  likesService = new LikesService();

  likeEvent = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.user;

    const likeEvent = await this.likesService.likeEvent(Number(postId), userId);
    if (likeEvent.success) {
      return res
        .status(likeEvent.statusCode)
        .json({ message: likeEvent.message });
    }
  };

  findLikedPosts = async (req, res) => {
    const userId = res.locals.user;
    const findLikedPostsData = await this.likesService.findLikedPosts(userId);
    return res.status(200).json({ data: findLikedPostsData });
  };
  //
}

module.exports = LikesController;
