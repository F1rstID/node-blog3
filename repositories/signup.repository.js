require('express-async-errors');
const { InternalServerError } = require('../helper/error.handling.helper');

class SignupRepository {
  constructor(SignupModel) {
    this.signupModel = SignupModel;
  }

  // 유저 생성
  createUserData = async (nickname, password) => {
    try {
      const createUser = await this.signupModel.create({
        nickname,
        password,
      });
      return createUser;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };

  // 닉네임 중복 확인을 위한 유저 검색
  findUserNickname = async (nickname) => {
    try {
      const findUser = await this.signupModel.findOne({
        where: { nickname },
        attributes: ['userId'],
      });
      return findUser;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };
}

module.exports = SignupRepository;
