var express = require('express');
var unirest = require('unirest');
var constants = require('../config/constants');
var middleware = require('../config/middleware');
var router = express.Router();

router.get('/listar', middleware.sessionTrue(), middleware.checkCSRF(), function(req, res, next) {
  unirest.get(constants.data.accesos.url + 'usuario/listar')
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
             'Error: No se puede obtener la lista de usuarios',
             'Error de comunicación con el servicio de accesos'
           ]});
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Operación de listado de usuarios no disponible en el servicio de accesos',
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
