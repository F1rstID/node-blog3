require('dotenv').config();
const { Token } = require('../models');
const {
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  decodeToken,
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

    const { userId } = decodeToken(token, process.env.SECRETKEY);

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
        // 두 토큰이 전부 검증 되었으니 환경변수에 userId를 담은 후 넘어간다.
        res.locals.user = userId;
        next();
        return;
      }
      // AccessToken은 검증에 성공 했지만 RefreshToken은 검증하지 못했다.
      // RefreshToken을 발급한다.
      const newRefreshToken = createRefreshToken(process.env.SECRETKEY);

      await Token.create({
        userId,
        refreshToken: newRefreshToken,
      });
      // RefreshToken 발급 했으니 환경변수에 userId를 담은 후 다음으로.
      res.locals.user = userId;

      next();
      return;
    }

    if (!accessToken) {
      // AccessToken 검증 실패 (유효하지 않은 토큰)
      if (validateRefreshToken(refreshToken, process.env.SECRETKEY)) {
        // AccessToken은 검증에 실패 했지만 RefreshToken이 유효함.
        // 따라서 새로운 AccessToken을 발급 한다.
        const newAccessToken = createAccessToken(userId, process.env.SECRETKEY);
        // 발급후 쿠키와 환경변수에 등록.
        res.locals.user = getDecodedPayload(
          newAccessToken,
          process.env.SECRETKEY,
        ).userId;
        // res.cookie('Authorization', `Bearer ${newAccessToken}`);
        req.cookies.Authorization = `Bearer ${newAccessToken}`;
        // AccessToken 발급 했으니 다음으로.
        next();
        return;
      }
    }
  } catch (err) {
    // 쿠키에 토큰을 담지 않고 접근했을 경우.
    return res.status(400).json({ errorMessage: err.message });
  }
};
// 이미 미들웨어에서 토큰 검증 하고 있으니 컨트롤러에서 검증파트 지우기.
