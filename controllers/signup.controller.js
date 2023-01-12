require('dotenv').config();
const SignupService = require('../services/signup.service');
require('express-async-errors');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res) => {
    const { nickname, password, confirm } = req.body;

    const createUser = await this.signupService.createUserData(
      nickname,
      password,
      confirm,
    );

    // 반환된 success가 true 일경우.
    if (createUser.success) {
      return res
        .status(createUser.statusCode)
        .json({ message: createUser.message });
    }
  };
}

module.exports = SignupController;
