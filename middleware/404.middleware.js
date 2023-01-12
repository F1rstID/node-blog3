// 404 에러
module.exports = ((req, res, next) => {
  res.status(404).json({ errorMessage: '페이지를 찾을수 없습니다.' });
});
