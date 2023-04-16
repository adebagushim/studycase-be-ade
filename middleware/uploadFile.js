const getFileName = (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.originalname || null
    }
    return next();
  }
  
  module.exports = {
    getFileName
  }