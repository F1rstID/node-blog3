const SignupService = require('../services/signup.service');

class SignupController {
  signupService = new SignupService();

  signup = async (req, res) => {
    try {
      const { nickname, password, confirm } = req.body;
      const createUser = await this.signupService.createUserData(
        nickname,
        password,
        confirm
      );

      // 반환된 success가 true 일경우.
      if (createUser.success) {
        return res
          .status(createUser.statusCode)
          .json({ message: createUser.message });
      }
      // 반환된 success가 false 일경우.
      return res
        .status(createUser.statusCode)
        .json({ errorMessage: createUser.errorMessage });
    } catch {
      res
        .status(400)
        .json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };
}

module.exports = SignupController;
