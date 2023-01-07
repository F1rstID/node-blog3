const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();

  likeEvent = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = res.locals.user;

      const likeEvent = await this.likesService.likeEvent(postId, userId);
      return res.status(201).json(likeEvent);
    } catch {
      return res.status(400).json({ errorMessage: '좋아요에 실패하였습니다.' });
    }
  };

  findLikedPosts = async (req, res) => {
    try {
      userId = res.locals.user;
      const findLikedPostsData = await this.likesService.findLikedPosts(userId);
      return res.status(200).json({ data: findLikedPostsData });
    } catch {
      return res
        .status(400)
        .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };
  //
}

module.exports = LikesController;
