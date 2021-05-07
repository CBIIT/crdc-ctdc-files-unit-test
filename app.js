var express = require('express');
var path = require('path');
var logger = require('morgan');
const fs = require('fs');

const LOG_FOLDER = 'logs';
if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER);
}

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, LOG_FOLDER, 'access.log'), { flags: 'a'})

var filesRouter = require('./routes/files');

var app = express();

// setup the logger
app.use(logger('combined', { stream: accessLogStream }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/files', filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({status: 404, message: `Path: '${req.path}' is not supported!`});
});

// error handler
app.use(function(err, req, res, next) {
  const message = req.app.get('env') === 'development' ? err.message : 'error';

  // render the error page
  res.status(err.status || 500);
  res.json(message);
});

module.exports = app;
