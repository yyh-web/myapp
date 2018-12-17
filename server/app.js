var createError = require('http-errors');
var express = require('express');
var path = require('path'); // nodejs自带的模块  放在哪里就表示哪个位置的路径
var cookieParser = require('cookie-parser'); // 获取cookie进行转化你
var logger = require('morgan');
var ejs = require("ejs");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter =  require('./routes/auth'); // 认证服务获取token
var goodRouter = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/goods',goodRouter);

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
