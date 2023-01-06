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
        errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
      };
    }
    // 암호화 추가 해야함.
    const token = jwt.sign({ userId: userData.userId }, process.env.SECRETKEY, {
      expiresIn: '300s',
    });
    return { authType: 'Bearer', authToken: token };
  };
}

module.exports = LoginService;
