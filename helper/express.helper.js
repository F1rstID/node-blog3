function resCreater(success, statusCode, message) {
  if (success) {
    return { success: true, statusCode, message };
  }
  return { success: false, statusCode, errorMessage: message };
}

module.exports = { resCreater };
