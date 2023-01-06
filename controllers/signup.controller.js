const SignupService = require('../services/signup.service');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res) => {
    const { nickname, password, confirm } = req.body;
    const createUser = await this.signupService.createUserData(
      nickname,
      password,
      confirm
    );
    res.status(201).json(createUser);
  };
}

module.exports = SignupController;
