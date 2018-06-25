var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var loginHelper = require('../helpers/login_helper');
var middleware = require('../config/middleware');

router.get('/', function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Accesos',
    helpers: helpers,
    csss: loginHelper.indexCss(),
    jss: loginHelper.indexJs(),
    mensaje: '',
    error: {
      numero: 404,
      mensaje: 'Archivo no encontrado',
      descripcion: 'La página que busca no se encuentra en el servidor',
      icono: 'fa fa-exclamation-triangle'
    }
  };
  res.render('login/index', locals);
});

module.exports = router;
