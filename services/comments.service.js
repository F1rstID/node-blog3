const CommentsRepository = require('../repositories/comments.repository');
const { Comment, User } = require('../models');

class CommentsService {
  commentsRepository = new CommentsRepository(Comment,User);

  findComments = async (postId) => {
    const comments = await this.commentsRepository.findComments(postId);
    // map 돌리기
    return comments;
  };

  createComment = async (postId, userId, comment) => {
    const createComment = await this.commentsRepository.createComment(
      postId,
      userId,
      comment
    );

    return createComment;
  };

  //
}

module.exports = CommentsService;
