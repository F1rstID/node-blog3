const CommentsService = require('../services/comments.service');
const Joi = require('joi');
const { update } = require('../models/user');

class CommentsController {
  commentsService = new CommentsService();
  // 댓글 조회
  getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentsService.findComments(postId);
      res.status(200).json({ data: comments });
    } catch {
      res.status(400).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
  };
  // 댓글 작성
  craeteComment = async (req, res) => {
    const createCommentData = await this.commentsService.createComment(
      req,
      res
    );

    if (createCommentData.success) {
      return res
        .status(createCommentData.statusCode)
        .json({ message: createCommentData.message });
    }
    return res
      .status(createCommentData.statusCode)
      .json({ errorMessage: createCommentData.errorMessage });
  };
  // 댓글 수정
  updateComment = async (req, res) => {
    const updateCommentData = await this.commentsService.updateComment(
      req,
      res
    );

    if (updateCommentData.success) {
      return res
        .status(updateCommentData.statusCode)
        .json({ message: updateCommentData.message });
    }
    return res
      .status(updateCommentData.statusCode)
      .json({ errorMessage: updateCommentData.errorMessage });
  };
  // 댓글 삭제
  deleteComment = async (req, res) => {
    const deleteCommentData = await this.commentsService.deleteComment(
      req,
      res
    );

    if (deleteCommentData.success) {
      return res
        .status(deleteCommentData.statusCode)
        .json({ message: deleteCommentData.message });
    }
    return res
      .status(deleteCommentData.statusCode)
      .json({ errorMessage: deleteCommentData.errorMessage });
  };
}

module.exports = CommentsController;
