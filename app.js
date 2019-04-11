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
        // res.sendFile(path.join(__dirname + '/public/views/login.html'));
    } else
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

app.get('/confirm', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/confirm.html'));
});

// Set les routes pour les API GET
let users = require('./routes/api/users');
app.route('/api/users/:param')
    .get(users.get, function (req, res) {
        res.send(req.body);
    })
    .post(users.post);


/*
Yo nouveauté ici, j'ai choisis de mettre les METHOD les une sà la suite des autres pour chaque api, ça nous évite d'avoir
un fichier par METHOD style reservationsGet, reservationsPost etc...
du coup ce que j'ia fait, c'est que lieu d'exporter une seule fonction dans reservations.js
j'exporte un objet contenant les 3 fonctions (celle pour get, celle pour post et celle pour put que je n'ai pas encore fait)
du coup en dessous j'importe le gros objet avec les 3 fonctions, et je dis au routeur d'aller sur l'url /api/reservations/ <- avec le param ici
et si c'est un get il go dans .get(....), si c'est un post il go dans .post(...)

et dedans si je suis dans le .get, je lui dis d'utiliser la fonction pour le get < reservation.get > que j'ai exporté dans reservation.js
j'te laisse voir le fichier reservations.js pour plus de détails
 */
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
