const LikesService = require('../services/likes.service');
const { getDecodedPayload } = require('../helper/jwt.helper');

class LikesController {
  likesService = new LikesService();

  likeEvent = async (req, res) => {
    const { postId } = req.params;
    const { Authorization } = req.cookies;
    const accessToken = Authorization.split(' ')[1];
    const { userId } = getDecodedPayload(accessToken, process.env.SECRETKEY);

    const likeEvent = await this.likesService.likeEvent(postId, userId);
    return res.status(201).json(likeEvent);
  };

  findLikedPosts = async (req, res) => {
    const { Authorization } = req.cookies;
    const accessToken = Authorization.split(' ')[1];
    const { userId } = getDecodedPayload(accessToken, process.env.SECRETKEY);

    const findLikedPostsData = await this.likesService.findLikedPosts(userId);
    return res.status(200).json({ data: findLikedPostsData });
  };
  //
}

module.exports = LikesController;
