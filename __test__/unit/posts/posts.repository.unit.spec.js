// __tests__/unit/posts.repository.unit.spec.js

const PostRepository = require('../../../repositories/posts.repository');
const { sequelize } = require('../../../models');
const { Op } = require('sequelize');
// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPostsModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

let postRepository = new PostRepository(mockPostsModel);

describe('Layered Architecture Pattern Posts Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('Posts Repository findAllPost Method', async () => {
    const obj = {
      postId: 1,
      title: 'title',
      createdAt: '몇시야!',
      updatedAt: '일어나',
      likes: '1',
      User: {
        userId: 2,
        nickname: 'test1',
      },
    };
    mockPostsModel.findAll = jest.fn(() => {
      return obj;
    });

    const posts = await postRepository.findAllPost();
    expect(postRepository.postModel.findAll).toHaveBeenCalledTimes(1);
    console.log(posts);
    expect(posts).toBe(obj);
  });

  test('Posts Repository createPost Method', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
});
