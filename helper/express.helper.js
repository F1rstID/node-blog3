function resCreater(success, statusCode, message) {
  if (success) {
    return { success: true, statusCode: statusCode, message: message };
  }
  return { success: false, statusCode: statusCode, errorMessage: message };
}

module.exports = { resCreater };
