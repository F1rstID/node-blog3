const LoginService = require('../services/login.service');

class LoginController {
  loginService = new LoginService();

  login = async (req, res) => {
    try {
      const { nickname, password } = req.body;
      const validateUser = await this.loginService.validateUser(
        nickname,
        password
      );

      // Service 에서 Retrun한 값의 success가 True 일경우
      if (validateUser.success) {
        res.cookie('Authorization', validateUser.message);

        return res
          .status(validateUser.statusCode)
          .json({ message: validateUser.message });
      }
      // Service 에서 Retrun한 값의 success가 False 일경우
      return res
        .status(validateUser.statusCode)
        .json({ errorMessage: validateUser.errorMessage });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: '로그인에 실패하였습니다' });
    }
  };
}

module.exports = LoginController;
