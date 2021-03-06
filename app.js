var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var middleware = require('./config/middleware');
// routes
var login = require('./routes/login');
var home = require('./routes/home');
var accesos = require('./routes/accesos');
var sistema = require('./routes/sistema');
var modulo = require('./routes/modulo');
var subtitulo = require('./routes/subtitulo');
var item = require('./routes/item');
var permiso = require('./routes/permiso');
var rol = require('./routes/rol');
var usuario = require('./routes/usuario');
var error = require('./routes/error');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(express.static(path.join(__dirname, 'public')));
//use middleware
app.use(middleware.preResponse());
//mount the routes
app.use('/', home);
app.use('/login', login);
app.use('/accesos', accesos);
app.use('/sistema', sistema);
app.use('/modulo', modulo);
app.use('/subtitulo', subtitulo);
app.use('/item', item);
app.use('/permiso', permiso);
app.use('/rol', rol);
app.use('/usuario', usuario);
app.use('/error', error);
// catch 404 and forward to error handler
app.use(middleware.error404());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err :
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
  }
);
module.exports = app;
