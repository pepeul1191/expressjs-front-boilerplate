var express = require('express');
var unirest = require('unirest');
var constants = require('../config/constants');
var router = express.Router();

router.get('/listar', function(req, res, next) {
  unirest.get(constants.data.accesos.url + 'sistema/listar')
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
             'Se ha producido un error en comunicarse con el servicio de accesos',
             'Error 500'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Recuso no encontrado en el servicio de accesos',
             'Error 404'
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
  unirest.post(constants.data.accesos.url + 'sistema/guardar')
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
             'Se ha producido un error en comunicarse con el servicio de accesos',
             'Error 500'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Recuso no encontrado en el servicio de accesos',
             'Error 404'
           ]}
         );
      }else{
        status = response.status;
        body = response.body;
      }
      res.status(status).send(body);
    });
});

module.exports = router;
