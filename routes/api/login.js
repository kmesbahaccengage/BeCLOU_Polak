let express = require('express');
let User = require('../modules/user');
let router = express.Router();

router.post('/', async function (req, res) {
    //res.redirect('/users?email=' + req.body.email);
    let user = new User();
    let response = await user.login(req.body);
    if (response){
        res.set('Content-Type', 'application/json');
        res.send(response);
    } else res.status(401).send("Authentification failed");
});

module.exports = router;
