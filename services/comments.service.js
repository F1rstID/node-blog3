const CommentsRepository = require('../repositories/comments.repository');
const { Comment, User } = require('../models');
const { resCreater } = require('../helper/express.helper');
const {
  Unauthorized, NotFound, BadRequestError,
} = require('../helper/error.handling.helper');

class CommentsService {
  commentsRepository = new CommentsRepository(Comment, User);

  findComments = async (postId) => {
    const findCommentsData = await this.commentsRepository.findComments(postId);
    // map 돌리기
    // "data": [
    //   {
    //       "commentId": 4,
    //       "userId": 1,
    //       "postId": 2,
    //       "comment": "안녕하세요",
    //       "createdAt": "2023-01-12T05:47:26.000Z",
    //       "updatedAt": "2023-01-12T05:47:26.000Z",
    //       "User": {
    //           "nickname": "test123"
    //       }
    //   },
    return findCommentsData;
  };

  createComment = async (postId, userId, comment) => {
    try {
      await this.commentsRepository.createComment(postId, userId, comment);

      return resCreater(true, 201, '댓글을 작성하였습니다.');
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };

  //
  updateComment = async (commentId, userId, comment) => {
    try {
      const commentData = await this.commentsRepository.findComment(commentId);

      if (!commentData) throw new NotFound('댓글이 존재하지 않습니다.');

      if (userId !== commentData.userId) throw new Unauthorized('댓글을 수정할 권한이 없습니다.');

      const updateCommentData = await this.commentsRepository.updateComment(
        commentId,
        comment,
      );

      if (updateCommentData < 1) throw new BadRequestError('댓글 수정이 정상적으로 처리되지 않았습니다.');

      return resCreater(true, 201, '댓글을 수정하였습니다.');
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };

  deleteComment = async (commentId, userId) => {
    try {
      const commentData = await this.commentsRepository.findComment(commentId);

      if (!commentData) throw new NotFound('댓글이 존재하지 않습니다.');

      if (userId !== commentData.userId) throw new Unauthorized('댓글을 삭제할 권한이 없습니다.');

      const deleteComment = await this.commentsRepository.deleteComment(
        commentId,
      );

      if (deleteComment < 1) throw new BadRequestError('댓글 수정이 정상적으로 처리되지 않았습니다.');
      return resCreater(true, 201, '댓글을 삭제하였습니다..');
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };
}

module.exports = CommentsService;
