var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var accesosHelper = require('../helpers/accesos');
var middleware = require('../config/middleware');

router.get('/', function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Accesos',
    helpers: helpers,
    csss: accesosHelper.indexCss(),
    jss: accesosHelper.indexJs(),
    data: JSON.stringify({
      modulo : 'Accesos',
    }),
    'menu': JSON.stringify(
      [
        {
          url : 'accesos/',
          nombre : 'Accesos'
        },
      ]
    ),
    items: JSON.stringify(
      [
        {
          subtitulo: 'Opciones',
          items:
            [
              {
                item: 'Gestión de Sistemas',
                url: 'accesos/#/sistema'
              },
              {
                item: 'Gestión de Usuarios',
                url: 'accesos/#/usuario'
              },
            ]
        },
      ]
    ),
  };
  res.render('accesos/index', locals);
});

module.exports = router;
