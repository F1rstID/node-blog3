const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class LoginService {
  loginRepository = new LoginRepository(User);
  //
  findUserData = async (nickname, password) => {
    const findUser = await this.loginRepository.findUserData(
      nickname,
      password
    );
    return findUser;
  };
  validateUser = async (nickname, password) => {
    const userData = await this.findUserData(nickname, password);

    if (!userData) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
      };
    }
    // 암호화 추가 해야함.
    const accessToken = jwt.sign(
      { userId: userData.userId },
      process.env.SECRETKEY,
      {
        expiresIn: '30s',
      }
    );
    // return { authType: 'Bearer', authToken: accessToken };
    return {
      success: true,
      statusCode: 201,
      message: `Bearer ${accessToken}`,
    };
  };
}

module.exports = LoginService;
