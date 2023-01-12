const { sequelize } = require('../models');
require('express-async-errors');
const { InternalServerError } = require('../helper/error.handling.helper');

class PostRepository {
  // 의존성 주입
  constructor(PostsModel, UserModel, LikeModel) {
    this.postModel = PostsModel;
    this.userModel = UserModel;
    this.likeModel = LikeModel;
  }

  // 게시글 작성
  createPost = async (userId, title, content) => {
    try {
      const createPostData = await this.postModel.create({
        userId,
        title,
        content,
      });
      return createPostData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  // 게시글 전체 조회
  findAllPost = async () => {
    try {
      // 게시글 전체조회
      const posts = await this.postModel.findAll({
        attributes: [
          'postId',
          'title',
          'createdAt',
          'updatedAt',
          [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
        ],
        include: [
          {
            model: this.userModel,
            attributes: ['userId', 'nickname'],
          },
          {
            model: this.likeModel,
            attributes: [],
            require: false,
          },
        ],
        group: ['Post.postId'],
        order: [['createdAt', 'DESC']],
        // raw: true,
      });

      return posts;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  // 게시글 상세 조회
  findPostById = async (postId) => {
    try {
      const post = await this.postModel.findOne({
        attributes: [
          'postId',
          'title',
          'content',
          'createdAt',
          'updatedAt',
          [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
        ],
        where: { postId },
        include: [
          {
            model: this.userModel,
            attributes: ['userId', 'nickname'],
          },
          {
            model: this.likeModel,
            attributes: [],
            require: false,
          },
        ],
        group: ['Post.postId'],
        order: [['createdAt', 'DESC']],
      });

      return post;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  // 게시글을 기본키를 이용하여 검색
  findPostByPk = async (postId) => {
    try {
      const findPostByPkData = await this.postModel.findByPk(postId);
      return findPostByPkData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    try {
      const updatePostData = await this.postModel.update(
        { title, content },
        { where: { postId } },
      );
      return updatePostData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    try {
      const deletePostData = await this.postModel.destroy({
        where: { postId },
      });
      return deletePostData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  findtest = async () => {
    try {
      const testData = await this.postModel.findAll();
      return testData;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };
}

module.exports = PostRepository;
