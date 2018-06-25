var constants = require('../config/constants');

var indexCss = function() {
  var rpta = [];
  if(constants.data.ambiente == 'desarrollo'){
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'bower_components/swp-backbone/assets/css/constants',
      'bower_components/swp-backbone/assets/css/login',
      'assets/css/constants',
      'assets/css/login',
    ];
  }
  if(constants.data.ambiente == 'produccion'){
    rpta = [
      'dist/login.min'
    ];
  }
  return rpta;
}

var indexJs = function() {
  if(constants.data.ambiente == 'desarrollo'){
    rpta = [
    ];
  }
  if(constants.data.ambiente == 'produccion'){
    rpta = [
    ];
  }
  return rpta;
}

exports.indexCss = indexCss;
exports.indexJs = indexJs;
