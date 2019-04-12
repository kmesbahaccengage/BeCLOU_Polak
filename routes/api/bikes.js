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
                message = "Bike created sucessfully";
                error = "Bike couldn't be created";
                break;
            case 'updatestatus':
                result = await bike.updateBikeStatus(id, status);
                message = "Updated bike : " + id + "with status :" + status;
                error = "Couldn't update bike : " + id;

                break;
            case 'updatelocalisation':
                result = await bike.updateBikeLocalisation(id, district, longitude, latitude);
                message = "Updated localisation of bike with id : " + id;
                error = "Couldn't update localisation of bike with id : " + id;  
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
                if (req.query.status){
                    result = await bike.getAllBikeByStatus(req.query.status);
                    error = "Couldn't get all bikes with status : " + req.query.status;
                } else {
                    result = await bike.getAllBikes();
                    error = "Couldn't get all bikes";
                }
                break;
            case 'district':
                result = await bike.getBikeByDistrict(req.query.district);
                error = "Couldn't get bikes in district : " + req.query.district;
                break;
            case 'status':
                result = await bike.getBikeStatus(req.query.id);
                error = "Couldn't get status of bike with id : " + req.query.id;
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