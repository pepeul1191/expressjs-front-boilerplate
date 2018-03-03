function preResponse(){
  return function (req, res, next) {
    res.set('Server', 'Ubuntu');
    return next();
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
