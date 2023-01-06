class CommentsRepository {
  constructor(CommentModel) {
    this.commentModel = CommentModel;
  }

  findCommentsInPost = async (postId) => {
    const comments = await this.commentModel.findAll({
      where: { postId },
      order: [['commentId', 'DESC']],
    });
    return comments;
  };
}

module.exports = CommentsRepository;
