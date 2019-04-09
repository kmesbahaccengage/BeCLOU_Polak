let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set les routes public views
// Pour ajouter un chemin vers un .html, copier coller la fonction ci-dessous et changer le nom du ficher
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/signin', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/signin.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/login.html'));
});

app.get('/setting', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/setting.html'));
});

app.get('/reverse', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/reverse.html'));
});

// Set les routes pour les API GET
app.get('/api/users', require('./routes/api/users'), function (req, res) {
    res.send(req.body);
});



// Set les routes pour les API POST
app.post('/api/register', require('./routes/api/register'));
app.post('/api/login', require('./routes/api/login'));
app.post('/api/confirmUser', require('./routes/api/confirmUser'));

module.exports = app;

/*app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end();
});
*/
// catch 404 and forward to error handler
