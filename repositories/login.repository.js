const { Op } = require('sequelize');

class LoginRepository {
  constructor(LoginModel) {
    this.loginModel = LoginModel;
  }
  //
  findUserData = async (nickname, password) => {
    const user = await this.loginModel.findOne({
      where: {
        [Op.and]: [{ nickname }, { password }],
      },
    });
    return user;
  };
}

module.exports = LoginRepository;
