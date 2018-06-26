var express = require('express');
var unirest = require('unirest');
var constants = require('../config/constants');
var router = express.Router();

router.get('/listar/:subtitulo_id', function(req, res, next) {
  var subtitulo_id = req.params.subtitulo_id;
  unirest.get(constants.data.accesos.url + 'item/listar/' +  subtitulo_id)
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
             'Error: No se puede obtener la lista de items de un subtítulo',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de listado de items de un subtítulo no disponible en el servicio de accesos',
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

router.post('/guardar', function(req, res, next) {
  var data = req.body.data;
  unirest.post(constants.data.accesos.url + 'item/guardar')
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
             'Error: No se puede guardar los cambios en los item',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de guardado de cambios de los items no disponible en el servicio de accesos',
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
