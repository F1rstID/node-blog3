const CommentsRepository = require('../repositories/comments.repository');
const { Comment } = require('../models');

class CommentsService {
  commentsRepository = new CommentsRepository(Comment);

  findCommentsInPost = async (postId) => {
    const Comments = await this.commentsRepository.findCommentsInPost(postId);

    return Comments;
  };
  //
}

module.exports = CommentsService;
