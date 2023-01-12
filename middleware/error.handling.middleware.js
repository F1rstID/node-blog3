const {
  BadRequestError, Unauthorized, Forbidden, PreconditionFailed, NotFound,
} = require('../helper/error.handling.helper');

// 에러 핸들링 미들웨어
module.exports = ((err, req, res, next) => {
  if (err instanceof BadRequestError) return res.status(400).json({ errorMessage: err.message });
  if (err instanceof Unauthorized) return res.status(401).json({ errorMessage: err.message });
  if (err instanceof Forbidden) return res.status(403).json({ errorMessage: err.message });
  if (err instanceof PreconditionFailed) return res.status(412).json({ errorMessage: err.message });
  if (err instanceof NotFound) return res.status(404).json({ errorMessage: err.message });

  next();
});
