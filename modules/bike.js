let DB = require('./db');

class Bike {

    constructor() {}
    
    // GET
    async getBikeStatus(id) {
        let query = `SELECT status FROM bikes WHERE id = ${id}`;
        let bikeStatus = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return bikeStatus;
    }

    // GET
    async getBikeByDistrict(district) {
        let query = `SELECT * FROM bikes WHERE district = ${district}`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
    }

    // GET
    async getAllBikes() {
        let query = `SELECT * FROM bikes`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
    }

    // POST
    async createBike(district = null, longitude = null, latitude = null) {
        let query = !district && !longitude && !latitude ?
            `INSERT INTO bikes (status) VALUES (1)`
            : `INSERT INTO bikes (status, district, longitude, latitude) VALUES (1, ${district}, ${longitude}, ${latitude})`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
    }

    // PUTT
    async updateBikeStatus(id, status) {
        let query =`UPDATE bikes SET status = ${status} WHERE id = ${id}`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
    }

    // PUTT
    async updateBikeLocalisation(id, district, longitude, latitude) {
        if (await this.getBikeStatus(id) == 0) {
            return false;
        }
        let query = `UPDATE bikes SET district = ${district}, longitude = ${longitude}, latitude = ${latitude} WHERE id = ${id}`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
     }
}
module.exports = Bike;
