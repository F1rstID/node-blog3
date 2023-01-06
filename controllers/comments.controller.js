const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();
  //
  getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await this.commentsService.findCommentsInPost(postId);
    res.status(200).json({ data: comments });
  };
}

module.exports = CommentsController;
