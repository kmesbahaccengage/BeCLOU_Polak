let express = require('express');
let sha256 = require('sha256');
let User = require('../modules/user');
let mailer = require('../modules/mailer');
let router = express.Router();

router.post('/', async function (req, res) {
    let user = new User();
    let hash = sha256("L6Y&JsfJ#KURxuRj", req.body.email, Date.now());
    let response = await user.register(req.body, hash);
    if (response) {
        mailer.sendRegisterConfirmationLink(req.body, hash);
        console.log("send" + response);
        res.set('Content-Type', 'application/json');
        res.send(response);
    } else {
        res.set('Content-Type', 'text/plain');
        res.status(401).send("User already exists");
    }
});

module.exports = router;
