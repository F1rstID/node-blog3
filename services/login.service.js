const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

class LoginService {
  loginRepository = new LoginRepository(User);
  //
  findUserData = async (nickname) => {
    const findUser = await this.loginRepository.findUserData(nickname);
    return findUser;
  };
  validateUser = async (nickname, password) => {
    const userData = await this.findUserData(nickname);
    if (!userData) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
      };
    }
    const validatePassword = bcrypt.compareSync(password, userData.password);

    if (!validatePassword) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
      };
    }

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
