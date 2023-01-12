/* eslint-disable max-classes-per-file */
// 400
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}
// 401
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}
// 403
class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
  }
}
// 404
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
  }
}
// 412
class PreconditionFailed extends Error {
  constructor(message) {
    super(message);
    this.name = 'PreconditionFailed';
  }
}
// 500
class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
  }
}

module.exports = {
  BadRequestError, Unauthorized, Forbidden, NotFound, PreconditionFailed, InternalServerError,
};
