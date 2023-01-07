const LikesService = require('../services/likes.service');

class LikesController {
  likesService = new LikesService();

  likeEvent = async (req, res) => {
    const { postId } = req.params;
    const userId = res.locals.user;

    const likeEvent = await this.likesService.likeEvent(postId, userId);
    if (likeEvent.success) {
      return res
        .status(likeEvent.statusCode)
        .json({ message: likeEvent.message });
    }
    return res
      .status(likeEvent.statusCode)
      .json({ errorMessage: likeEvent.errorMessage });
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
