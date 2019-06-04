//Librarias
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var db = require('./config/database');
var routes = require('./routes/routes');
var jwtMiddleware = require("express-jwt");
var secrets = require("./config/secrets");
const findAppBySecret = require('./middlewares/findAppBySecret');
const findAppByApplicationId = require('./middlewares/findAppByApplicationId');
const authApp = require('./middlewares/authApp')();
const allowCORs = require('./middlewares/allowCORs')();
//conexion
db.connect();
//Instancias
var app = express();
//config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//rutas

app.use(findAppBySecret);
app.use(findAppByApplicationId);
//app.use(authApp.unless({method: 'OPTIONS'})); //Linea de seguridad app

app.use(allowCORs.unless({path: '/public'}));

app.use(jwtMiddleware({secret:secrets.jwtSecret}).unless({path:['/auth','/users'],method:['GET','OPTIONS']}));
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
