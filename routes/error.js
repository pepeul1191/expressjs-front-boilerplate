var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var errorHelper = require('../helpers/error_helper');

router.get('/access/8080', function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Error',
    helpers: helpers,
    csss: errorHelper.indexCss(),
    jss: errorHelper.indexJs(),
    error: {
      numero: 8080,
      mensaje: 'Error de Sesión',
      descripcion: req.session.mensaje_error,
      icono: 'fa fa-exclamation-triangle'
    }
  };
  res.status(500).render('error/access', locals);
  res.end('Cannot ' + req.method + ' ' + req.url);
});

router.get('/access/:numero_error', function(req, res, next) {
  if (req.method == 'GET'){
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
});

module.exports = router;
