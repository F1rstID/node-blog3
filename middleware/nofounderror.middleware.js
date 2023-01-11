module.exports = (req, res, next) => {

  res.status(404).json({ errorMessage: '404 not FOund' })
  next()

}