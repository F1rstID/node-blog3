class CommentsRepository {
  constructor(CommentModel, UserModel) {
    this.commentModel = CommentModel;
    this.userModel = UserModel;
  }

  findComments = async (postId) => {
    const findCommentsData = await this.commentModel.findAll({
      include: [
        {
          model: this.userModel,
          attributes: ['nickname'],
        },
      ],
      where: { postId },
      order: [['commentId', 'DESC']],
    });
    return findCommentsData;
  };

  createComment = async (postId, userId, comment) => {
    const createCommentData = await this.commentModel.create({
      postId,
      userId,
      comment,
    });
    return createCommentData;
  };

  updateComment = async (commentId, comment) => {
    const updateCommentData = await this.commentModel.update(
      { comment },
      { where: { commentId } }
    );
    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const deleteCommentData = await this.commentModel.destroy({
      where: { commentId },
    });
    return deleteCommentData;
  };
}

module.exports = CommentsRepository;
