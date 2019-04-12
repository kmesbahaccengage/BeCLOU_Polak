let DB = require('./db');
let Bike = require('./bike');
//let User = require('./user');
//let Bike = require('./bike');
const STATUS_BOOKED = 1;
const STATUS_USED = 2;
const STATUS_FINISHED = 3;

class Reservation {
    constructor() {
        this.bike = new Bike();
    }

    async createReservation(userId, bikeId, beginAt, duration) {
        let bikeStatus = await this.bike.getBikeStatus(bikeId);
        let lastUserReservation = await this.getLastReservationByUserId(userId);
        console.log("derniere reservation :", lastUserReservation);
        console.log("statut :", lastUserReservation[0].status);
        if (bikeStatus[0].status !== 1) {
            console.log("Bike already booked");
            return false;
        } else if (lastUserReservation.length > 0 && lastUserReservation[0].status < 3) {
            console.log("User " + userId + " can not reserve more than one bike");
            return false;
        }
        await this.bike.updateBikeStatus(bikeId, 2);
        let query = `insert into reservations (users_id, bikes_id, begin_at, duration) values (${userId}, ${bikeId}, '${beginAt}', ${duration})`;
        let reservation = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                if (err) resolve(false);
                resolve(result);
            });
        });
        return reservation;
    }

    async cancelReservation(id) {
        let status = await this.getStatus(id);
        status = status[0].status;
        let bikeId = await this.getBike(id);
        if (status !== 1) {
            return false
        }
        await this.updateStatus(id, 4);
        await this.bike.updateBikeStatus(bikeId, 1);
        return true;
    }

    async updateStatus(id, status) {
        console.log("id de la reservation : " + id);
        let bikeId = await this.getBike(id);
        if (status === 3) {
            await this.bike.updateBikeStatus(bikeId, 1);
        }
        let query = `update reservations set status = ${status} where id = ${id}`;
        let reservation = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                console.log("hello", result);
                if (err) resolve(false);
                resolve(result);
            });
        });
        return reservation;
    }

    async getLastReservationByUserId(userId) {
        let query = `select * from reservations where users_id = ${userId} order by id desc limit 1`;
        let reserv = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                if (err || result.affectedRows == 0) result = null;
                resolve(result);
            });
        });
        return reserv;
    }

    async getStatus(id) {
        let query = `select status from reservations where id = ${id}`;
        let status = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return status;
    }

    async getUserId(id) {
        let query = `select users_id from reservations where id = ${id}`;
        let user_id = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return user_id;
    }

    async getBike(id) {
        let query = `select bikes_id from reservations where id = ${id}`;
        let bike_id = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return bike_id;
    }

    async getCreationDate(id) {
        let query = `select create_at from reservations where id = ${id}`;
        let createAt = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return createAt;
    }

    async getBeginDate(id) {
        let query = `select begin_at from reservations where id = ${id}`;
        let createAt = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return createAt;
    }

    async getDuration(id) {
        let query = `select duration from reservations where id = ${id}`;
        let duration = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return duration;
    }

    async getTimeLeft(id) {
        let beginAt = await this.getBeginDate();
        let duration = await this.getDuration();

        // faire le calcul avec l'heure + l'heure du begin en comparant bien si ça change de jour
    }

    async getReservationsByUserId(userId) {
        let query = `select * from reservations where users_id = ${userId}`;
        let reservations = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return reservations;
    }

    async getCurrentReservations() {
        let query = `select * from reservations where status < 3`;
        let reservations = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return reservations;
    }

    async getCurrentReservationByBikeId(id) {
        let query = `select * from reservations where bikes_id = ${id} and status = 1`;
        let reservations = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return reservations;
    }

    async getAllReservations() {
        let query = `select * from reservations`;
        let reservations = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result);
            });
        });
        return reservations;
    }
}

module.exports = Reservation;