let User = require('../../modules/user');

module.exports = function (req, res) {
    let user = new User();
    let {id, hash} = req;
    if (user.validateUser(id, hash)) {
        res.send('Account successfully confirmed');
    } else res.status(401).send('Bad authentification or link expired');
    // ajouter le fait de rendrele le hash expiré quand on a confirmé la co
    // ajouter l'état 1 quand c'est en pending juste après l'envoi de mail
    // envoyer un mail de remerciement après la confirmation
};