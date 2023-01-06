const CommentsService = require('../services/comments.service');
const { verifyJWT } = require('../helper/jwt.helper');

class CommentsController {
  commentsService = new CommentsService();
  // 댓글 조회
  getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await this.commentsService.findComments(postId);
    res.status(200).json({ data: comments });
  };
  // 댓글 작성
  craeteComment = async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const { Authorization } = req.cookies;
    const payload = Authorization.split(' ')[1];
    const token = verifyJWT(payload, process.env.SECRETKEY);

    await this.commentsService.createComment(postId, token.userId, comment);

    res.status(201).json({ message: '대충 댓글 작성 완료' });
  };

  updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    await this.commentsService.updateComment(commentId, comment);

    res.status(201).json({ message: '대충 업뎃' });
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;

    await this.commentsService.delteComment(commentId);

    res.status(201).json({message: '대충 삭제'})
  };
}

module.exports = CommentsController;
