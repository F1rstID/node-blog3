require('dotenv').config();
const {
  getAccessTokenPayload,
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
} = require('../helper/jwt.helper');
module.exports = (req, res, next) => {
  const { Authorization } = req.cookies;
  // Authorization 이 없을시 에러 발생
  if (!Authorization) {
    throw new Error('Token does not exist.');
  }

  const accessToken = getAccessTokenPayload(
    Authorization,
    process.env.SECRETKEY
  );

  if (!accessToken) {
    // 엑세스 토큰 검증 실패.
  }
};
