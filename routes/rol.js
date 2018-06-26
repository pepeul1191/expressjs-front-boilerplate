var express = require('express');
var unirest = require('unirest');
var constants = require('../config/constants');
var router = express.Router();

router.get('/listar/:sistema_id', function(req, res, next) {
  var sistema_id = req.params.sistema_id;
  unirest.get(constants.data.accesos.url + 'rol/listar/' +  sistema_id)
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
             'Error: No se puede obtener la lista de roles de un sistema',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de listado de roles de un sistema no disponible en el servicio de accesos',
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
  unirest.post(constants.data.accesos.url + 'rol/guardar')
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
             'Error: No se puede guardar los cambios en los roles',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de guardado de cambios de los roles no disponible en el servicio de accesos',
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

router.get('/permiso/listar/:sistema_id/:rol_id', function(req, res, next) {
  var sistema_id = req.params.sistema_id;
  var rol_id = req.params.rol_id;
  unirest.get(constants.data.accesos.url + '/rol/permiso/listar/' +  sistema_id + '/' + rol_id)
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
             'Error: No se puede obtener la lista de permisos de un rol',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de listado de permisos de un rol no disponible en el servicio de accesos',
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

router.post('/permiso/guardar', function(req, res, next) {
  var data = req.body.data;
  unirest.post(constants.data.accesos.url + 'rol/permiso/guardar')
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
             'Error: No se puede guardar los cambios en los permisos de los roles',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de guardado de cambios de los permisos roles no disponible en el servicio de accesos',
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
