/* eslint-disable consistent-return */
const Joi = require('joi');
const CommentsService = require('../services/comments.service');
const { PreconditionFailed } = require('../helper/error.handling.helper');
require('express-async-errors');

const commentSchema = Joi.object({
  comment: Joi.string().required(),
});

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
    const resultSchema = commentSchema.validate(req.body);

    // Request Body 의 타입 검증 실패시 : 413 에러 발생
    if (resultSchema.error) throw new PreconditionFailed('데이터 형식이 올바르지 않습니다.');

    const { postId } = req.params;
    const { comment } = resultSchema.value;
    const userId = res.locals.user;

    const createCommentData = await this.commentsService.createComment(postId, userId, comment);

    // 성공
    if (createCommentData.success) {
      return res
        .status(createCommentData.statusCode)
        .json({ message: createCommentData.message });
    }
  };

  // 댓글 수정
  updateComment = async (req, res) => {
    const resultSchema = commentSchema.validate(req.body);

    if (resultSchema.error) throw new PreconditionFailed('데이터 형식이 올바르지 않습니다.');

    const { commentId } = req.params;
    const { comment } = resultSchema.value;
    const userId = res.locals.user;

    const updateCommentData = await this.commentsService.updateComment(commentId, userId, comment);

    if (updateCommentData.success) {
      return res
        .status(updateCommentData.statusCode)
        .json({ message: updateCommentData.message });
    }
  };

  // 댓글 삭제
  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = res.locals.user;

    const deleteCommentData = await this.commentsService.deleteComment(commentId, userId);

    if (deleteCommentData.success) {
      return res
        .status(deleteCommentData.statusCode)
        .json({ message: deleteCommentData.message });
    }
  };
}

module.exports = CommentsController;
