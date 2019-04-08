let express = require('express');
let router = express.Router();
let db = require('../modules/db');

render();

// Put all the db queries on a db module with all functions

async function render() {
    router.get('/', async function (req, res, next) {
        let users = await db.getUsers();
        res.render('users', {title: 'Users from the database', users: users});
    });
}

module.exports = router;