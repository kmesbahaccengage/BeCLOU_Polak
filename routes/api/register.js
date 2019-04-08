let sha256 = require('sha256');
let User = require('../../modules/user');
let mailer = require('../../modules/mailer');

module.exports = async function (req, res) {
    let user = new User();
    let {email, firstname, lastname, password} = req.body;
    let hash = sha256("L6Y&JsfJ#KURxuRj" + email + Date.now());
    let response = await user.register(email, firstname, lastname, password, hash);
    if (response) {
        mailer.sendRegisterConfirmationLink(email, hash);
        console.log("send" + response);
        res.set('Content-Type', 'application/json');
        res.send(response);
    } else {
        res.set('Content-Type', 'text/plain');
        res.status(401).send("User already exists");
    }
};
