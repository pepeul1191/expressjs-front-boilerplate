var constants = require('../config/constants');
var helpers = require('../config/helpers');
var errorHelper = require('../helpers/error_helper');

function preResponse(){
  return function (req, res, next) {
    res.set('Server', 'Ubuntu');
    res.set('sistema_id', 1);
    return next();
  }
}

function error404(){
  return function (req, res, next) {
    if ('GET' == req.method){
      var locals = {
        constants: constants.data,
        title: 'Error',
        helpers: helpers,
        csss: errorHelper.indexCss(),
        jss: errorHelper.indexJs(),
        error: {
          numero: 404,
          mensaje: 'Archivo no encontrado',
          descripcion: 'La página que busca no se encuentra en el servidor',
          icono: 'fa fa-exclamation-triangle'
        }
      };
      res.status(404).render('error/access', locals);
    }else{
      var rpta = JSON.stringify({
          tipo_mensaje: 'error',
          mensaje: [
            'Recurso no encontrado',
            'El recurso que busca no se encuentra en el servidor'
        ]});
      res.status(404).send(rpta);
    }
  }
}

function sessionTrue(){
  return function (req, res, next) {
    if (constants.data.ambiente_session == 'activo'){
      var continuar = false;
      if(req.session.estado == 'inactivo'){
        req.session.mensaje_error = 'Su tiempo de sesión ha terminado';
      }
      if(req.session.estado === undefined){
        req.session.mensaje_error = 'Nececita estar logeuado';
      }
      if(req.session.estado == 'activo'){
        continuar = true;
      }
      if (continuar == false){
        return res.redirect('/error/access/8080');
      }
    }
    return next();
  }
}

function sessionFalse(){
  return function (req, res, next) {
    if (constants.data.ambiente_session == 'activo'){
      var continuar = false;
      if(req.session.estado == 'activo'){
        continuar = true;
      }
      if (continuar == true){
        return res.redirect('/accesos/');
      }
    }
    return next();
  }
}

function checkCSRF(){
  return function (req, res, next) {
    if (constants.data.ambiente_csrf == 'activo'){
      var continuar = true;
      var mensaje = '';
      request_header = req.get(constants.data.csrf.key);
      if(request_header === undefined){
        continuar = false;
        mensaje = 'CSRF Token error';
      } else if(request_header != constants.data.csrf.secret){
        continuar = false;
        mensaje = 'CSRF Token key error';
      }
      if (continuar == false){
        var rpta = JSON.stringify({
            tipo_mensaje: 'error',
            mensaje: [
              'No se puede acceder al recurso',
              mensaje
          ]});
        return res.status(500).send(rpta);
      }
    }
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
exports.error404 = error404;
exports.sessionTrue = sessionTrue;
exports.sessionFalse = sessionFalse;
exports.checkCSRF = checkCSRF;
exports.tiempo= tiempo;
