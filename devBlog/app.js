var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Wire in our authentication module
var passport = require('passport');
require('./app_api/config/passport');

//routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var updatesRouter = require('./app_server/routes/updates');
var apiRouter = require('./app_api/routes/index');

var handlebars = require('hbs');

//bring db
require('./app_api/models/db');

//pull in .env
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

//register handlebar partials.  
handlebars.registerPartials(__dirname + '/app_server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//use cors
app.use('/api', (req, res, next) => 
{
    let cors = {
        origin: ["http://localhost:4200", "http://localhost:3001"],
        default: "http://localhost:3001"
    }
    const origin = cors.origin.includes(req.header('origin').toLowerCase()) ? req.headers.origin : cors.default;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();    
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/updates', updatesRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
    console.log('req.params.id:  ', req.params.id);
    next(createError(404));
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) =>
{
    if(err.name === 'UnauthorizedError')
    {
        res.status(401).json({"message": err.name + ": " + err.message});
    }
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
