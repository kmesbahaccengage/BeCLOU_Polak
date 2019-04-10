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
                message = "createBike() succesfull !";
                error = "createBike() failed !";
                break;
            case 'updatestatus':
                result = await bike.updateBikeStatus(id, status);
                message = "updateBikeStatus() successfull !";
                error = "updateBikeStatus() failed !";

                break;
            case 'updatelocalisation':
                result = await bike.updateBikeLocalisation(id, district, longitude, latitude);
                message = "updateBikeLocalisation() succesfull !";
                error = "updateBikeLocalisation() failed !";  
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
        let error;

        switch (req.params.param) {
            case 'all':
                result = await bike.getAllBikes();
                error = "getAllBikes() failed !"
                break;
            case 'district':
                result = await bike.getBikeByDistrict(req.query.district);
                error= "getBikeByDistrict() failed !";
                break;
            case 'status':
                result = await bike.getBikeStatus(req.query.id);
                error = "getBikeStatus() failed !";
                break;
            default:
                result = {};
                break;
        }
        if (result) {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        } else res.status(400).send(error);
    },
};