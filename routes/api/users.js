let User = require('../../modules/user');
let sha256 = require('sha256');
let mailer = require('../../modules/mailer');

module.exports = {
    post: async function (req, res) {
        let user = new User();
        let result;
        let msg;
        let error;
        let {email, firstname, lastname, password, hash} = req.body;
        switch (req.params.param) {
            case 'register':
                let newHash = sha256("L6Y&JsfJ#KURxuRj" + email + Date.now());
                result = await user.register(email, firstname, lastname, password, newHash);
                if (result) {
                    await mailer.sendRegisterConfirmationLink(email, newHash);
                    console.log("send " + email);
                    res.set("Content-Type", "application/json");
                    res.send({msg: result});
                } else res.status(401).send(error);
                break;
            case 'confirm':
                //return true or false
                result = await user.validateUser(hash);
                if (result) {
                    res.set("Content-Type", "application/json");
                    res.send({msg: "User confirmed"});
                } else res.status(401).send("Error user non validated");
                break;
            case 'login':
                //return les infos de l'user : session ?
                result = await user.login(email, password);
                if (result) {
                    req.session.uid = result.id;
                    res.set("Content-Type", "application/json");
                    res.send({msg: "User with id : " + result.id + "logged"});
                    // res.session.uid = result.id;
                } else res.status(400).send("Error login");
                break;
            case 'logout':
                let user_id = req.session.uid;
                req.session.destroy(function (err) {
                    if (err) {
                        res.send(400).send("Error login");
                    }
                });
                res.set("Content-Type", "application/json");
                res.send({msg: "User with id : " + user_id + " logged out"});
                break;
            default:
                result = {};
                break;
        }
    },
    get: async function (req, res) {
        let user = new User();
        let result;
        switch (req.params.param) {
            case 'all':
                if (!req.query.user_id)
                    result = await user.getUsers();
                else result = await user.getUserById(req.query.user_id);
                break;
            case 'session':
                if (req.session.uid) {
                    result = await user.getUserById(req.session.uid);
                } else
                    result = false;
                break;
        }
        if (result) {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        } else res.status(400).send("error");
    },
};