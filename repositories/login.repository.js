require('express-async-errors');
const { InternalServerError } = require('../helper/error.handling.helper');

class LoginRepository {
  constructor(LoginModel) {
    this.loginModel = LoginModel;
  }

  //
  findUserData = async (nickname) => {
    try {
      const user = await this.loginModel.findOne({
        where: { nickname },
      });
      return user;
    } catch {
      throw new InternalServerError('DB 에러');
    }
  };
}

module.exports = LoginRepository;
