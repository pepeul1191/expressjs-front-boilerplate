var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var middleware = require('../config/middleware');
var models = require('../config/models');

router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/listar', middleware.tiempo(5) ,function(req, res, next) {
  models.Blog.find({},function(err, blogs){
    res.send(JSON.stringify(blogs));
  });
});

router.get('/set', middleware.tiempo(5) ,function(req, res, next) {
  req.session.tiempo = new Date().toLocaleTimeString();
  res.send('set');
});

router.get('/get', middleware.tiempo(5) ,function(req, res, next) {
  res.send(req.session.tiempo);
});

module.exports = router;
