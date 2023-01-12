const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const LoginRepository = require('../repositories/login.repository');
const { User } = require('../models');
const { resCreater } = require('../helper/express.helper');
const { BadRequestError, PreconditionFailed } = require('../helper/error.handling.helper');

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

      if (!userData) throw new PreconditionFailed('닉네임 또는 패스워드를 확인해주세요.');

      const validatePassword = bcrypt.compareSync(password, userData.password);

      if (!validatePassword) throw new PreconditionFailed('닉네임 또는 패스워드를 확인해주세요.');

      const accessToken = jwt.sign(
        { userId: userData.userId },
        process.env.SECRETKEY,
        {
          expiresIn: '30s',
        },
      );
      return resCreater(true, 201, `Bearer ${accessToken}`);
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  };
}

module.exports = LoginService;
