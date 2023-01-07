const LoginRepository = require('../repositories/login.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { resCreater } = require('../helper/express.helper');

class LoginService {
  loginRepository = new LoginRepository(User);
  //
  findUserData = async (nickname) => {
    const findUser = await this.loginRepository.findUserData(nickname);
    return findUser;
  };
  validateUser = async (nickname, password) => {
    try {
      const userData = await this.findUserData(nickname);
      if (!userData) {
        return resCreater(false, 412, '닉네임 또는 패스워드를 확인해주세요.');
      }
      const validatePassword = bcrypt.compareSync(password, userData.password);

      if (!validatePassword) {
        return resCreater(false, 412, '닉네임 또는 패스워드를 확인해주세요.');
      }

      const accessToken = jwt.sign(
        { userId: userData.userId },
        process.env.SECRETKEY,
        {
          expiresIn: '30s',
        }
      );

      return {
        success: true,
        statusCode: 201,
        message: `Bearer ${accessToken}`,
      };
    } catch {
      return resCreater(false, 400, '로그인에 실패하였습니다.');
    }
  };
}

module.exports = LoginService;
