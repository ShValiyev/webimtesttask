var express = require('express');
var path = require('path');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./libs/mongoose');
var config = require('./config/index');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Настройки сессии
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  resave: false,
  saveUninitialized: true,
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

//Инициализация passport и его сессии
app.use(passport.initialize());
app.use(passport.session());

require('./libs/passport')(app);
require('./routes/index')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
