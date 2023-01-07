const CommentsService = require('../services/comments.service');
const Joi = require('joi');

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
    try {
      const commentSchema = Joi.object({
        comment: Joi.string().required(),
      });
      const resultSchema = commentSchema.validate(req.body);
      if (resultSchema.error) {
        return res.status(412).json({
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
      }
      const { postId } = req.params;
      const { comment } = resultSchema.value;
      const userId = res.locals.user;

      await this.commentsService.createComment(postId, userId, comment);

      return res.status(201).json({ message: '댓글을 작성하였습니다.' });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
    }
  };
  // 댓글 수정
  updateComment = async (req, res) => {
    try {
      const commentSchema = Joi.object({
        comment: Joi.string().required(),
      });
      const resultSchema = commentSchema.validate(req.body);
      if (resultSchema.error) {
        return res.status(412).json({
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
      }

      const { commentId } = req.params;
      const { comment } = resultSchema.value;
      const userId = res.locals.user;

      const commentData = await this.commentsService.findComment(commentId);

      if (!commentData) {
        return res.status(404).json({
          errorMessage: '댓글이 존재하지 않습니다.',
        });
      }

      if (userId !== commentData.userId) {
        return res
          .status(401)
          .json({ errorMessage: '댓글을 수정할 권한이 없습니다.' });
      }

      const updateComment = await this.commentsService.updateComment(
        commentId,
        comment
      );

      if (updateComment < 1) {
        return res.status(400).json({
          errorMessage: '댓글 수정이 정상적으로 처리되지 않았습니다.',
        });
      }

      return res.status(201).json({ message: '댓글을 수정하였습니다' });
    } catch {
      return res.status(400).json({
        errorMessage: '댓글 수정에 실패하였습니다.',
      });
    }
  };
  // 댓글 삭제
  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = res.locals.user;

    const commentData = await this.commentsService.findComment(commentId);

    if (!commentData) {
      return res.status(404).json({
        errorMessage: '댓글이 존재하지 않습니다.',
      });
    }

    if (userId !== commentData.userId) {
      return res
        .status(401)
        .json({ errorMessage: '댓글을 삭제할 권한이 없습니다.' });
    }

    const deleteComment = await this.commentsService.deleteComment(commentId);

    if (deleteComment < 1) {
      return res
        .status(400)
        .json({ errorMessage: '댓글 삭제가 정상적으로 처리되지 않았습니다.' });
    }

    res.status(201).json({ message: '댓글을 삭제하였습니다.' });
  };
}

module.exports = CommentsController;
