var preResponse = function (req, res, next) {
  res.set('Server', 'Ubuntu');
  next();
}

exports.preResponse= preResponse;
