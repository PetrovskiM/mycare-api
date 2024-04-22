var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
const appointmentsRouter = require('./feature/appointments/routes/appointments-routes');
const locationRouter = require('./feature/location/routes/location-routes');
const HttpError = require('./core/common/http-error')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(bodyParser.json());
app.use('/api/appointments', appointmentsRouter);
app.use('/api/location', locationRouter);

app.use((req, res, next) => {
    throw new HttpError('Could not find this route', 404);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("404")
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
        .json({error: err.message || 'Unknown error occurred.'})
});

module.exports = app;
