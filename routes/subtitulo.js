var express = require('express');
var unirest = require('unirest');
var constants = require('../config/constants');
var middleware = require('../config/middleware');
var router = express.Router();

router.get('/listar/:modulo_id', middleware.sessionTrue(), middleware.checkCSRF(), function(req, res, next) {
  var modulo_id = req.params.modulo_id;
  unirest.get(constants.data.accesos.url + 'subtitulo/listar/' +  modulo_id)
    .headers({
      [constants.data.accesos.csrf_key]: constants.data.accesos.csrf_value,
    })
    .send()
    .end(function (response) {
      var status = '';
      var body = '';
      if(response.status === undefined || response.status === null){
        status = 500;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Error: No se puede obtener la lista de módulos de un sistema',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de listado de subtítulos de un módulo no disponible en el servicio de accesos',
             'Error 404: Recurso no encontrado'
           ]}
         );
      }else{
        status = response.status;
        body = response.body;
      }
      res.status(status).send(body);
    });
});

router.post('/guardar', middleware.sessionTrue(), middleware.checkCSRF(), function(req, res, next) {
  var data = req.body.data;
  unirest.post(constants.data.accesos.url + 'subtitulo/guardar')
    .headers({
      [constants.data.accesos.csrf_key]: constants.data.accesos.csrf_value,
    })
    .send({
      'data': data,
    })
    .end(function (response) {
      var status = '';
      var body = '';
      if(response.status === undefined || response.status === null){
        status = 500;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Error: No se puede guardar los cambios en los subtitulos',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de guardado de cambios de los subtítulos no disponible en el servicio de accesos',
             'Error 404: Recurso no encontrado'
           ]
         });
      }else{
        status = response.status;
        body = response.body;
      }
      res.status(status).send(body);
    });
});

module.exports = router;
