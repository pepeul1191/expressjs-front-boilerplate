var express = require('express');
var unirest = require('unirest');
var async = require('async');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var loginHelper = require('../helpers/login_helper');
var middleware = require('../config/middleware');

router.get('/', middleware.sessionFalse(), function(req, res, next) {
  var locals = {
    constants: constants.data,
    title: 'Bienvenido',
    helpers: helpers,
    csss: loginHelper.indexCss(),
    jss: loginHelper.indexJs(),
    mensaje: '',
  };
  res.render('login/index', locals);
});


router.post('/acceder', function(req, res, next) {
  var req_csrf_val = req.body[constants.data.csrf.key];
  var usuario = req.body.usuario;
  var contrasenia = req.body.contrasenia;
  var body = '';
  if(req_csrf_val != constants.data.csrf.secret){
    console.log("**** INICIO - ERROR EN LOGIN (CSRF token)***");
    console.log(mensaje);
    console.log(body);
    console.log("**** FIN ***");
    var mensaje = 'Error en Token CSRF POST request';
    var locals = {
      constants: constants.data,
      title: 'Bienvenido',
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      mensaje: mensaje,
    };
    res.render('login/index', locals);
  }else{
    var rpta = {
      status: null,
      body: null,
    };
    async.parallel({
      validarUsuarioSistema: function(callback) {
        loginHelper.validarUsuarioSistema(usuario).then(function(result){
          callback(null, result);
        })
      },
    }, function(err, results) {
      if(typeof results.validarUsuarioSistema === 'object'){//hubo un error
        console.log("**** INICIO - ERROR EN LOGIN (Comunicación con servicio al validar el usuario/sistema)***");
        console.log(results.validarUsuarioSistema.body);
        console.log("**** FIN ***");
        var locals = {
          constants: constants.data,
          title: 'Bienvenido',
          helpers: helpers,
          csss: loginHelper.indexCss(),
          jss: loginHelper.indexJs(),
          mensaje: results.validarUsuarioSistema.body.mensaje[0],
        };
        res.status(500).render('login/index', locals);
      }else if(results.validarUsuarioSistema == 1){
        unirest.post(constants.data.accesos.url + 'usuario/validar')
          .headers({
            [constants.data.accesos.csrf_key]: constants.data.accesos.csrf_value,
          })
          .send({
            'usuario': usuario,
            'contrasenia': contrasenia,
          })
          .end(function (response) {
            var status = '';
            var mensaje = '';
            var error = true;
            if(response.status === undefined || response.status === null){
              status = 500;
              mensaje = 'Error de comunicación con el servicio de accesos';
              body = response.body;
            }else if(response.status == 404){
              status = response.status;
              mensaje = 'Operación de login no disponible en el servicio de accesos';
              body = response.body;
            }else if(response.status == 500){
              status = response.status;
              mensaje = 'Ha ocurrido un error en el servicio de accesos';
              body = response.body;
            }else{
              status = response.status;
              body = response.body;
              if(body == '1'){
                error = false;
              }else{
                mensaje = 'Usuario y/o contraseña no válidos';
              }
            }
            if(error == true){
              console.log("**** INICIO - ERROR EN LOGIN (Comunicación con servicio)***");
              console.log(mensaje);
              console.log(body);
              console.log("**** FIN ***");
              var locals = {
                constants: constants.data,
                title: 'Bienvenido',
                helpers: helpers,
                csss: loginHelper.indexCss(),
                jss: loginHelper.indexJs(),
                mensaje: mensaje,
              };
              res.status(500).render('login/index', locals);
            }else{
              req.session.tiempo = new Date().toLocaleTimeString();
              req.session.usuario = usuario;
              req.session.estado = 'activo';
              res.redirect('/accesos/');
            }
          });
        }else{
          var locals = {
            constants: constants.data,
            title: 'Bienvenido',
            helpers: helpers,
            csss: loginHelper.indexCss(),
            jss: loginHelper.indexJs(),
            mensaje: 'Usuario no tiene acceso a dicho sistema',
          };
          res.status(500).render('login/index', locals);
        }
    });
  }
});

router.get('/ver', middleware.sessionTrue(), function(req, res, next) {
  body = 'Usuario: ' + req.session.usuario + '<br>' +
    'Estado: ' + req.session.estado + '<br>' +
    'Momento: ' + req.session.tiempo;
  res.status(200).send(body);
});

router.get('/cerrar', middleware.sessionTrue(), function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
