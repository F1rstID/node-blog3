require('express-async-errors');
const { InternalServerError } = require('../helper/error.handling.helper');

class CommentsRepository {
  constructor(CommentModel, UserModel) {
    this.commentModel = CommentModel;
    this.userModel = UserModel;
  }

  findComments = async (postId) => {
    try {
      const findCommentsData = await this.commentModel.findAll({
        include: [
          {
            model: this.userModel,
            attributes: ['nickname'],
          },
        ],
        where: { postId },
        order: [['createdAt', 'DESC']],
      });
      return findCommentsData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  createComment = async (postId, userId, comment) => {
    try {
      const createCommentData = await this.commentModel.create({
        postId,
        userId,
        comment,
      });
      return createCommentData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  updateComment = async (commentId, comment) => {
    try {
      const updateCommentData = await this.commentModel.update(
        { comment },
        { where: { commentId } },
      );
      return updateCommentData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  deleteComment = async (commentId) => {
    try {
      const deleteCommentData = await this.commentModel.destroy({
        where: { commentId },
      });
      return deleteCommentData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  findComment = async (commentId) => {
    try {
      const findCommentData = await this.commentModel.findByPk(commentId);
      return findCommentData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };
}

module.exports = CommentsRepository;
