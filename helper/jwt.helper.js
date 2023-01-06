const jwt = require('jsonwebtoken');

function verifyJWT(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return false;
  }
}

module.exports = { verifyJWT };
