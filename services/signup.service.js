const SignupRepository = require('../repositories/signup.repository');
const { User } = require('../models');
const { isRegExpValidation } = require('../helper/regExp.helper');
const bcrypt = require('bcrypt');

class SignupService {
  signupRepository = new SignupRepository(User);

  findUserNickname = async (nickname) => {
    const findUser = await this.signupRepository.findUserNickname(nickname);

    return findUser;
  };

  createUserData = async (nickname, password, confirm) => {
    const nicknameRegExp = /^[a-zA-Z0-9]{3,10}$/;
    const passwordRegExp = /^[a-zA-Z0-9]{4,30}$/;
    const incluePasswordInNicknameRegExp = new RegExp(`${nickname}`);

    if (password !== confirm) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '패스워드가 일치하지 않습니다.',
      };
    }

    if (!isRegExpValidation(nickname, nicknameRegExp)) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '닉네임의 형식이 일치하지 않습니다.',
      };
    }

    if (!isRegExpValidation(password, passwordRegExp)) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '패스워드의 형식이 일치하지 않습니다.',
      };
    }

    if (isRegExpValidation(password, incluePasswordInNicknameRegExp)) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
      };
    }

    // 닉네임 중복검사를 위한 find
    const findUser = await this.findUserNickname(nickname);

    if (findUser) {
      return {
        success: false,
        statusCode: 412,
        errorMessage: '이미 사용중인 닉네임 입니다.',
      };
    }
    const encryptedPassword = bcrypt.hashSync(
      password,
      Number(process.env.BCRYPTSALT)
    );

    await this.signupRepository.createUserData(nickname, encryptedPassword);
    return {
      success: true,
      statusCode: 201,
      message: '회원 가입에 성공하였습니다.',
    };
  };
}

module.exports = SignupService;
