const SignupService = require('../services/signup.services');

class SignupController {
  signupService = new SignupService();

  signupUser = async (req, res) => {
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
