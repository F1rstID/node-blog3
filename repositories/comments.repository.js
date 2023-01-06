class CommentsRepository {
  constructor(CommentModel, UserModel) {
    this.commentModel = CommentModel;
    this.userModel = UserModel;
  }

  findComments = async (postId) => {
    const comments = await this.commentModel.findAll({
      include: [
        {
          model: this.userModel,
          attributes: ['nickname'],
        },
      ],
      where: { postId },
      order: [['commentId', 'DESC']],
    });
    return comments;
  };

  createComment = async (postId, userId, comment) => {
    const comments = await this.commentModel.create({
      postId,
      userId,
      comment,
    });
    return comments;
  };
}

module.exports = CommentsRepository;
