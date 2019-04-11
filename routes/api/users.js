let User = require('../../modules/user');

module.exports = {
post: async function (req, res) {
	let user = new User();
	let result;
	let {email, firstname, lastname, password} = req.body;
	switch (req.params.param) {
		case 'register':
			let hash = sha256("L6Y&JsfJ#KURxuRj" + email + Date.now());
			let response = await user.register(email, firstname, lastname, password, hash);
			if (response) {
				await mailer.sendRegisterConfirmationLink(email, hash);
				console.log("send " + email);
				res.set('Content-Type', 'application/json');
				res.send(response);
			} else {
				res.set('Content-Type', 'text/plain');
				res.status(401).send("User already exists");
			}
			break;
		case 'confirm':
			result = await user.validateUser(hash);
			break;
		case 'login':
			break;
		default:
			result = {};
			break;
		}
		if (result) {
			res.set("Content-Type", "application/json");
			res.send({ msg: message});
		} else res.status(400).send(error);
	},
get: async function (req, res) {
	switch (req.params.param) {
		case 'all':
		if (!req.query.id)
				result = await reserv.getAllReservations();
			else result = await reserv.getReservationsByUserId(req.query.user_id);
			break;
		}
		if (result) {
			res.set("Content-Type", "application/json");
			res.send(JSON.stringify(result));
		} else res.status(400).send(error);
	},
};