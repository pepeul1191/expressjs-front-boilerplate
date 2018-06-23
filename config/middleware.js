var constants = require('../config/constants');
var helpers = require('../config/helpers');
var errorHelper = require('../helpers/error');

function preResponse(){
  return function (req, res, next) {
    res.set('Server', 'Ubuntu');
    return next();
  }
}

function error404(){
  return function (req, res, next) {
    req.session.errorMethod = req.method;
    res.redirect('/error/access/404');
  }
}

function tiempo(numero){
  return function (req, res, next) {
    if (numero % 2 == 0){
      res.redirect('http://www.google.com.pe');
    }
    console.log(Date.now());
    return next();
  }
}

exports.preResponse= preResponse;
exports.tiempo= tiempo;
exports.error404 = error404;
