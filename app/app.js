require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const gameRouter = require('./routes/game');
require('./models/cleaner');

const app = express();
// view engine setup

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
  app.use(logger('dev'));
}
app.use(express.json());
app.use(favicon(path.join(__dirname, 'favicons', 'favicon.ico')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/games', gameRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(fallback(path.join(__dirname, '../public', 'index.html')));

module.exports = app;
