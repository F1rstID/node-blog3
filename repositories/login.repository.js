class LoginRepository {
  constructor(LoginModel) {
    this.loginModel = LoginModel;
  }
  //
  findUserData = async (nickname) => {
    const user = await this.loginModel.findOne({
      where: { nickname },
    });
    return user;
  };
}

module.exports = LoginRepository;
