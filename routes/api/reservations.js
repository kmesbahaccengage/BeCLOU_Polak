let Reservations = require('../../modules/reservation');

/*
Hello

voici donc l'objet que j'exporte
en moins brouillan til ressemble à ça
{
    get: fonction quand c'est une method get,
    post: fonction quand c'est une method post,
    put: fonction quand c'est une method put (que j'ai pas encore fait
}

et au final ça revient  au même que c'que t'as fait toi sur tes fichier quand tu exportais une seule fonctions par fichier
sauf que là ça exporte le tout dans un seul objet
voili voilou

j'te laisse regarder
 */
module.exports =
    {
        post: async function (req, res) {
            let {id, userId, bikeId, beginAt, duration, status} = req.body;
            let reserv = new Reservations();
            let result;

            console.log(req.params.param);
            switch (req.params.param){
                case 'create':
                    result = await reserv.createReservation(userId, bikeId, beginAt, duration);
                    break;
                case 'update':
                    result = await reserv.updateStatus(id, status);
                    break;
                default:
                    result = {};
                    break;
            }
            if (result) {
                res.set('Content-Type', 'application/json');
                res.send(
                    {
                        msg: req.params.param === 'create' ? "Reservation created"
                            : "Reservation updated"
                    }
                );
            } else res.status(400).send("Couldn't POST a reservation");
        },
        get: async function (req, res) {
            let reserv = new Reservations();
            let result;

            switch (req.params.param) {
                case 'bike':
                    result = await reserv.getBike(req.query.id);
                    break;
                case 'status':
                    result = await reserv.getStatus(req.query.id);
                    break;
                case 'userid':
                    result = await reserv.getUserId(req.query.id);
                    break;
                case 'creationdate':
                    result = await reserv.getCreationDate(req.query.id);
                    break;
                case 'begindate':
                    result = await reserv.getBeginDate(req.query.id);
                    break;
                case 'lastreservation':
                    result = await reserv.getLastReservationByUserId(req.query.user_id);
                    break;
                case 'all':
                    if (!req.query.user_id)
                        result = await reserv.getAllReservations();
                    else result = await reserv.getReservationsByUserId(req.query.user_id);
                    break;
                default:
                    result = {};
                    break;
            }
            if (result) {
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            } else res.status(400).send("Couldn't get");
        }
    };
