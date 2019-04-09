let User = require('../../modules/user');

module.exports = async function (req, res) {
    console.log(Date.UTC());
    let userClass = new User();
    let users = await userClass.getUsers();
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(users));
};