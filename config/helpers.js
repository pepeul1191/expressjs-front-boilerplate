var unirest = require('unirest');
var constants = require('./constants');

var loadCss = function(csss) {
  var rpta = "";
  if (typeof csss != 'undefined'){
    for(var i = 0; i < csss.length; i++){
      rpta = rpta + '<link rel="stylesheet" type="text/css" href="'+ constants.data.static_url + csss[i] + '.css" />'
    }
  }
  return rpta;
}

var loadJs = function(jss) {
  var rpta = "";
  if (typeof jss != 'undefined'){
    for(var i = 0; i < jss.length; i++){
      rpta = rpta + '<script src="' + constants.data.static_url + jss[i] + '.js"></script>'
    }
  }
  return rpta;
}

var menuModulos = function() {
  var sistemaId = constants.data.sistema_id;
  var rpta = {
    status: null,
    body: null,
  };
  return new Promise(function(resolve, reject) {
    return unirest.get(constants.data.accesos.url + 'modulo/menu/' +  sistemaId)
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
             'Se ha producido un error en el menú de módulos del sistema',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Se ha producido un error en el menú de módulos del sistema',
             'Error 404: Recurso no encontrado'
           ]}
         );
      }else{
        rpta.status = response.status;
        rpta.body = response.body;
      }
      if(rpta.status == 200){
        //console.log("menuModulos");console.log(rpta.body);
        resolve(rpta.body);
      }else{
        console.log(rpta.body);
        resolve(JSON.stringify([]));
      }
    });
  });
}

var menuItems = function(moduloNombre) {
  ///item/menu?sistema_id=1&modulo=Accesos
  var sistemaId = constants.data.sistema_id;
  var rpta = {
    status: null,
    body: null,
  }
  return new Promise(function(resolve, reject) {
    //console.log(constants.data.accesos.url + 'item/menu?sistema_id=' +  sistemaId + '&modulo=' + moduloNombre);
    return unirest.get(constants.data.accesos.url + 'item/menu?sistema_id=' +  sistemaId + '&modulo=' + moduloNombre)
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
             'Se ha producido un error en obtener el submenú del módulo',
             'Error de comunicación con el servicio de accesos'
           ]
         });
      }else if(response.status == 404){
        status = response.status;
        body = JSON.stringify({
          tipo_mensaje: 'error',
           mensaje: [
             'Se ha producido un error en obtener el submenú del módulo',
             'Error 404: Recurso no encontrado'
           ]}
         );
      }else{
        rpta.status = response.status;
        rpta.body = response.body;
      }
      if(rpta.status == 200){
        //console.log("menuItems");console.log(rpta.body);
        resolve(rpta.body);
      }else{
        console.log(rpta.body);
        resolve(JSON.stringify([]));
      }
    });
  });
}

exports.loadCss = loadCss;
exports.loadJs = loadJs;
exports.menuModulos = menuModulos;
exports.menuItems = menuItems;
