const CommentsRepository = require('../repositories/comments.repository');
const { Comment, User } = require('../models');
const Joi = require('joi');
const { resCreater } = require('../helper/express.helper');

const commentSchema = Joi.object({
  comment: Joi.string().required(),
});

class CommentsService {
  commentsRepository = new CommentsRepository(Comment, User);

  findComments = async (postId) => {
    const findCommentsData = await this.commentsRepository.findComments(postId);
    // map 돌리기
    return findCommentsData;
  };

  createComment = async (req, res) => {
    try {
      const resultSchema = commentSchema.validate(req.body);

      if (resultSchema.error) {
        return resCreater(false, 412, '데이터 형식이 올바르지 않습니다.');
      }

      const { postId } = req.params;
      const { comment } = resultSchema.value;
      const userId = res.locals.user;

      await this.commentsRepository.createComment(postId, userId, comment);

      return resCreater(true, 201, '댓글을 작성하였습니다.');
    } catch (err) {
      console.log(err);
      return resCreater(false, 400, '댓글 작성에 실패하였습니다.');
    }
  };
  //
  updateComment = async (req, res) => {
    try {
      const resultSchema = commentSchema.validate(req.body);

      if (resultSchema.error) {
        return resCreater(false, 412, '데이터 형식이 올바르지 않습니다.');
      }

      const { commentId } = req.params;
      const { comment } = resultSchema.value;
      const userId = res.locals.user;

      const commentData = await this.commentsRepository.findComment(commentId);

      if (!commentData) {
        return resCreater(false, 404, '댓글이 존재하지 않습니다.');
      }

      if (userId !== commentData.userId) {
        return resCreater(false, 401, '댓글을 수정할 권한이 없습니다.');
      }

      const updateCommentData = await this.commentsRepository.updateComment(
        commentId,
        comment
      );

      if (updateCommentData < 1) {
        return resCreater(
          false,
          400,
          '댓글 수정이 정상적으로 처리되지 않았습니다.'
        );
      }
      return resCreater(true, 201, '댓글을 수정하였습니다.');
    } catch {
      return resCreater(false, 400, '댓글 수정에 실패하였습니다.');
    }
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = res.locals.user;

    const commentData = await this.commentsRepository.findComment(commentId);

    if (!commentData) {
      return resCreater(false, 404, '댓글이 존재하지 않습니다.');
    }

    if (userId !== commentData.userId) {
      return resCreater(false, 401, '댓글을 삭제할 권한이 없습니다.');
    }

    const deleteComment = await this.commentsRepository.deleteComment(
      commentId
    );

    if (deleteComment < 1) {
      return resCreater(
        false,
        400,
        '댓글 삭제가 정상적으로 처리되지 않았습니다.'
      );
    }
    return resCreater(true, 201, '댓글을 삭제하였습니다..');
  };
}

module.exports = CommentsService;
