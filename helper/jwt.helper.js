const jwt = require('jsonwebtoken');

function getAccessTokenPayload(accessToken, secretKey) {
  try {
    return jwt.verify(accessToken, secretKey);
  } catch {
    return false;
  }
}

function createAccessToken(userId, secretKey) {
  const accessToken = jwt.sign({ userId }, secretKey, { expiresIn: '30s' });
  return accessToken;
}

function createRefreshToken(secretKey) {
  const refreshToken = jwt.sign({}, secretKey, { expiresIn: '7d' });
  return refreshToken;
}

function validateAccessToken(accessToken, secretKey) {
  try {
    jwt.verify(accessToken, secretKey);
    return true;
  } catch {
    return false;
  }
}

function validateRefreshToken(refreshToken, secretKey) {
  try {
    jwt.verify(refreshToken, secretKey);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  getAccessTokenPayload,
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
};
