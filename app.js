var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.onSocketConnect = function(socket) {
  console.log("A user connected");
  var io = app.get('io');

  // Add an event handler that will get called when we
  // receive a disconnect message
  socket.on('disconnect', function(){
    console.log("A user disconnected");
  });

  // Add an event that will get called when we receive
  // a 'char message' event
  socket.on('chat message', function(msg){
    // emit a 'chat message' event with the msg to all connected clients
    io.emit('chat message', msg);
  });
}

/*
// Here is all my websocket functionality
io.on('connect', function(socket){
  console.log("A user connected");

  // Add an event handler that will get called when we
  // receive a disconnect message
  socket.on('disconnect', function(){
    console.log("A user disconnected");
  });

  // Add an event that will get called when we receive
  // a 'char message' event
  socket.on('chat message', function(msg){
    // emit a 'chat message' event with the msg to all connected clients
    io.emit('chat message', msg);
  });

});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
