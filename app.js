let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'beclou'}));
app.use(session({uid: 1}));
app.use(express.static(path.join(__dirname, 'public')));

// Set les routes public views
// Pour ajouter un chemin vers un .html, copier coller la fonction ci-dessous et changer le nom du ficher
app.get('/', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/signin', function (req, res) {
    if (req.session.uid) {
        res.redirect('/');
    }
    res.sendFile(path.join(__dirname + '/public/views/signin.html'));
});

app.get('/login', function (req, res) {
    if (req.session.uid) {
        res.redirect('/');
    }
    res.sendFile(path.join(__dirname + '/public/views/login.html'));
});

app.get('/setting', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/setting.html'));
});

app.get('/reverse', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/reverse.html'));
});

app.get('/confirm', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/confirm.html'));
});

app.get('/unlock', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/unlock.html'));
});

app.get('/booking', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/booking.html'));
});


app.get('/qr', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/qrcode.html'));
});

app.get('/map', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/map.html'));
});

app.get('/finish', function (req, res) {
    if (!req.session.uid) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname + '/public/views/finish.html'));
});

// Set les routes pour les API GET
let users = require('./routes/api/users');
app.route('/api/users/:param')
    .get(users.get, function (req, res) {
        res.send(req.body);
    })
    .post(users.post);

let reservations = require('./routes/api/reservations');
app.route('/api/reservations/:param')
    .get(reservations.get, function (req, res) {
        res.send(req.body);
    })
    .post(reservations.post);

let bikes = require('./routes/api/bikes');
app.route('/api/bikes/:param')
    .get(bikes.get, function (req, res) {
        res.send(req.body);
    })
    .post(bikes.post);

module.exports = app;