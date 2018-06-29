var unirest = require('unirest');
var async = require('async');
var constants = require('../config/constants');

var indexCss = function() {
  var rpta = [];
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'bower_components/swp-backbone/assets/css/constants',
      'bower_components/swp-backbone/assets/css/login',
      'assets/css/constants',
      'assets/css/login',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
      'dist/login.min'
    ];
  }
  return rpta;
}

var indexJs = function() {
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
    ];
  }
  return rpta;
}

var validarUsuarioSistema = async function(usuario, sistemaId){
  var rpta = {
    status: null,
    body: null,
  };
  return new Promise.resolve(

);
}

var validarUsuarioSistema = function(usuario) {
  var rpta = {
    status: null,
    body: null,
  };
  var sistemaId = constants.data.sistema_id;
  return new Promise(function(resolve, reject) {
    return unirest.post(constants.data.accesos.url + 'sistema/usuario/validar')
      .headers({
        [constants.data.accesos.csrf_key]: constants.data.accesos.csrf_value,
      })
      .send({
        'usuario': usuario,
        'sistema_id': sistemaId,
      })
      .end(function (response) {
        var status = '';
        var body = '';
        if(response.status === undefined || response.status === null){
          rpta.status = 500;
          rpta.body = {
            tipo_mensaje: 'error',
             mensaje: [
               'Se ha producido un error en validar si el usuario está asociado al presente sistema',
               'Error de comunicación con el servicio de accesos'
             ]};
        }else if(response.status == 404){
          rpta.status = response.status;
          body = {
            tipo_mensaje: 'error',
             mensaje: [
               'Se ha producido un error en validar si el usuario está asociado al presente sistema',
               'Error 404: Recurso no encontrado'
             ]};
        }else{
          rpta.status = response.status;
          rpta.body = response.body;
        }
        if(rpta.status == 200){
          //console.log("menuModulos");console.log(rpta.body);
          resolve(rpta.body);
        }else{
          //console.log(rpta.body);
          resolve(rpta);
        }
      });
  });
}

exports.indexCss = indexCss;
exports.indexJs = indexJs;
exports.validarUsuarioSistema = validarUsuarioSistema;
