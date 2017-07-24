var auth = require('basic-auth');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var https = require('https');


//===================================================routes
var authenticate = require('./routes/authenticate');

//===================================================//routes

var app = require('express')
    , cors = require('cors')
    , app = express();

app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//===================================================bind routes
app.use('/api/v1/authenticate', authenticate);

//===================================================/bind routes
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

//create a server object:
http.createServer(function (req, res) {
    console.log('server running on 8088');
}).listen(8088); //the server object listens on port 8080

module.exports = app;
