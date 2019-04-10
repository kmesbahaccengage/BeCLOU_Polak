let Bikes = require('../../modules/bike');

module.exports = {
    post: async function (req, res) {
        let {address, longitude, latitude} = req.body;
        let bike = new Bikes();
        let response = await bike.createBike(address, longitude, latitude);
        if (response) {
            res.set("Content-Type", "application/json");
            res.send({ msg: "Bike created !"});
        } else res.status(400).send("Couldn't create a bike !");
    },
    get: async function (req, res) {
        let bike = new Bikes();
        let result;

        switch (req.params.param) {
            case 'all':
                result = await bike.getAllBikes();
                break;
            case 'district':
                result = await bike.getBikeByDistrict(req.query.district);
                break;
            case 'isfunctionnal':
                result = await bike.getIsFunctionnal(req.query.id);
                break;
            default:
                result = {};
                break;
        }
        if (result) {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        } else res.status(401).send('Error');
    },
    put: async function (req, res) {}
    
    
};