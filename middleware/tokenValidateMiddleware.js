require('dotenv').config();
const Token = require('../models');
const {
  getDecodedPayload,
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  getDecodedPayload,
} = require('../helper/jwt.helper');
module.exports = async (req, res, next) => {
  try {
    const { Authorization } = req.cookies;
    // Authorization 이 없을시 에러 발생
    if (!Authorization) {
      throw new Error('Token does not exist.');
    }

    const token = Authorization.split(' ')[1];

    const { userId } = getDecodedPayload(token, process.env.SECRETKEY);

    const accessToken = validateAccessToken(token, process.env.SECRETKEY);

    const findRefreshToken = await Token.findOne({
      where: { userId },
      attributes: ['refreshToken'],
    });
    // refreshToken이 Token 테이블에 존재 하면 refreshToken을 할당하고 없다면 false를 할당한다.
    const refreshToken = findRefreshToken
      ? findRefreshToken.refreshToken
      : false;

    if (accessToken) {
      // AccessToken 검증 성공.
      if (validateRefreshToken(refreshToken, process.env.SECRETKEY)) {
        // AccessToken, RefreshToken 검증 성공
        // 두 토큰이 전부 검증 되었으니 넘어간다.
        next();
      }
      // AccessToken은 검증에 성공 했지만 RefreshToken은 검증하지 못했다.
      // RefreshToken을 발급한다.
      const newRefreshToken = createRefreshToken(process.env.SECRETKEY);

      await Token.create({
        userId,
        refreshToken: newRefreshToken,
      });
      // RefreshToken 발급 했으니 다음으로.
      next();
    }

    if (!accessToken) {
      // AccessToken 검증 실패 (유효하지 않은 토큰)
      if (validateRefreshToken(refreshToken, process.env.SECRETKEY)) {
        // AccessToken은 검증에 실패 했지만 RefreshToken이 유효함.
        // 따라서 새로운 AccessToken을 발급 한다.
        const newAccessToken = createAccessToken(uesrId, process.env.SECRETKEY);
        // 발급후 쿠키에 등록.
        res.cookie('Authorization', newAccessToken);
        // AccessToken 발급 했으니 다음으로.
        next();
      }
    }
  } catch (err) {
    console.log(err);
  }
};
