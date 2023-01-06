const LikesService = require('../services/likes.service');
const { verifyJWT } = require('../helper/jwt.helper');

class LikesController {
  likesService = new LikesService();

  likeEvent = async (req, res) => {
    const { postId } = req.params;
    const { Authorization } = req.cookies;
    const payload = Authorization.split(' ')[1];
    const token = verifyJWT(payload, process.env.SECRETKEY);

    const likeEvent = await this.likesService.likeEvent(postId, token.userId);
    return res.status(201).json(likeEvent);
  };
  //
}

module.exports = LikesController;
