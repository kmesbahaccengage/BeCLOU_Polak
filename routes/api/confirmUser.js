let express = require('express');
let router = express.Router();
let User = require('../modules/user');

router.get('/:id', function (req, res) {
    let user = new User();
    let userId = req.params.id;
    let hash = req.query.hash;
    if (user.validateUser(userId, hash)) {
        res.redirect('http://localhost:3000/login');
    } else res.redirect(401, 'http://localhost:3000/login');
    // ajouter le fait de rendrele le hash expiré quand on a confirmé la co
    // ajouter l'état 1 quand c'est en pending juste après l'envoi de mail
    // envoyer un mail de remerciement après la confirmation
});

module.exports = router;