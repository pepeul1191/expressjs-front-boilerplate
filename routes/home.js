var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var middleware = require('../config/middleware');
var models = require('../config/models');

router.get('/', function(req, res, next) {
  var csss = [
    'bower_components/bootstrap/dist/css/bootstrap.min',
    'bower_components/font-awesome/css/font-awesome.min'
  ];
  var jss = [
    'bower_components/jquery/dist/jquery.min',
    'bower_components/bootstrap/dist/js/bootstrap.min'
  ];
  var locals = {
    constants: constants.data,
    title: 'Test EJS Title',
    helpers: helpers,
    csss: csss,
    jss: jss,
  };
  res.render('home/index', locals);
});

router.get('/listar', middleware.tiempo(5) ,function(req, res, next) {
  models.Blog.find({},function(err, blogs){
    res.send(JSON.stringify(blogs));
  });
});

module.exports = router;
