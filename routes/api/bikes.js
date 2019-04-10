let Bikes = require('../../modules/bike');

module.exports = {
    post: async function (req, res) {
        let {id, district, longitude, latitude, status} = req.body;
        let bike = new Bikes();
        let result;
        let message;
        let error;

        switch (req.params.param) {
            case 'create':
                result = await bike.createBike(district, longitude, latitude);
                message = "Bike Created !";
                error = "Couldn't create a bike !";
                break;
            case 'updatestatus':
                result = await bike.updateBikeStatus(id, status);
                message = "Status Bike Updated !";
                error = "Failed update bike status";

                break;
            case 'updatelocalisation':
                result = await bike.updateBikeLocalisation(id, district, longitude, latitude);
                message = "Localisation Bike Updated !";
                error = "Failed update bike localisation !";  
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
        let bike = new Bikes();
        let result;

        switch (req.params.param) {
            case 'all':
                result = await bike.getAllBikes();
                break;
            case 'district':
                result = await bike.getBikeByDistrict(req.query.district);
                break;
            case 'status':
                result = await bike.getBikeStatus(req.query.id);
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
};