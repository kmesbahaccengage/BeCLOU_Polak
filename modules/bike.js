let DB = require('./db');

class Bike {

    constructor() {}
    
    // GET
    async getIsFunctionnal(id) {
        let query = `SELECT is_functionnal FROM bikes WHERE id = ${id}`;
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
            `INSERT INTO bikes (is_functionnal) VALUES (1)`
            : `INSERT INTO bikes (is_functionnal, district, longitude, latitude) VALUES (1, ${district}, ${longitude}, ${latitude})`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
    }

    // PUTT
    async updateBikeStatus(id) {
        let bikeStatus = await this.getIsFunctionnal(id);
        let query = bikeStatus == 0 ?
            `UPDATE bikes SET is_functionnal = 1`
            : `UPDATE bikes SET is_functionnal = 0`;
        let bike = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err ? resolve(false)
                    : resolve(result);
            });
        });
        return bike;
    }

    // PUTT
    async updateBikeLocation(id, district, longitude, latitude) {
        if (await this.getIsFunctionnal(id) == 0) {
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
