const { valid } = require('joi');
const LoginService = require('../services/login.service');

class LoginController {
  loginService = new LoginService();

  login = async (req, res) => {
    const { nickname, password } = req.body;
    const validateUser = await this.loginService.validateUser(
      nickname,
      password
    );

    const { authType, authToken } = validateUser;

    if (authType === 'Bearer') {
      res.cookie('Authorization', `${authType} ${authToken}`);
      return res.status(200).json({ message: authToken });
    }

    return res.status(412).json(validateUser);
  };
}

module.exports = LoginController;
