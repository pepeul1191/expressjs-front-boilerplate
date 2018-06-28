var express = require('express');
var async = require('async');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var accesosHelper = require('../helpers/accesos_helper');
var middleware = require('../config/middleware');

router.get('/', middleware.sessionTrue(), function(req, res, next) {
  /*
  var menuModulos = helpers.menuModulos();
  var menuItems = helpers.menuItems('Accesos');
  var locals = {
    constants: constants.data,
    title: 'Accesos',
    helpers: helpers,
    csss: accesosHelper.indexCss(),
    jss: accesosHelper.indexJs(),
    data: JSON.stringify({
      modulo : 'Accesos',
    }),
    'menu': menuModulos,
    items: menuItems,
  };
  console.log("--------------------------------------------");
  console.log(menuItems);
  console.log("--------------------------------------------");
  console.log(menuModulos);
  res.render('accesos/index', locals);
  */
  async.parallel({
    menuModulos: function(callback) {
      helpers.menuModulos().then(function(result){
        callback(null, result);
      })
    },
    menuItems: function(callback) {
      helpers.menuItems('Accesos').then(function(result){
        callback(null, result);
      })
    }
  }, function(err, results) {
      var locals = {
        constants: constants.data,
        title: 'Accesos',
        helpers: helpers,
        csss: accesosHelper.indexCss(),
        jss: accesosHelper.indexJs(),
        data: JSON.stringify({
          modulo : 'Accesos',
        }),
        menu: results.menuModulos,
        items: results.menuItems,
      };

      res.render('accesos/index', locals);
  });
});

module.exports = router;
