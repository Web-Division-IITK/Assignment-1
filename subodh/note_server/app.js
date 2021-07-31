var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config')
var mongoose = require('mongoose');
const uri = `mongodb+srv://subodhkumar:${config.password}@cluster0.gm0lg.mongodb.net/test?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017/`

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var saveRouter = require('./routes/saveNote');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/savenote', saveRouter);
const url="mongodb://localhost:27017/";
mongoose.connect(uri,{ useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false }).then(() => {console.log('connected successfully to database')}).catch((error)=>{console.log(error)});

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
