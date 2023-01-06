const CommentsRepository = require('../repositories/comments.repository');
const { Comment, User } = require('../models');

class CommentsService {
  commentsRepository = new CommentsRepository(Comment, User);

  findComments = async (postId) => {
    const findCommentsData = await this.commentsRepository.findComments(postId);
    // map 돌리기
    return findCommentsData;
  };

  createComment = async (postId, userId, comment) => {
    const createCommentData = await this.commentsRepository.createComment(
      postId,
      userId,
      comment
    );

    return createCommentData;
  };
  //
  updateComment = async (commentId, comment) => {
    const updateCommentData = await this.commentsRepository.updateComment(
      commentId,
      comment
    );
    return updateCommentData;
  };
}

module.exports = CommentsService;
