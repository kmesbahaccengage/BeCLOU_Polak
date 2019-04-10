let DB = require('./db');
//let User = require('./user');
//let Bike = require('./bike');
const STATUS_BOOKED = 1;
const STATUS_USED = 2;
const STATUS_FINISHED = 3;

class Reservation {
    constructor() {
    }

    async createReservation(userId, bikeId, beginAt, duration) {
        let query = `insert into reservations (users_id, bikes_id, begin_at, duration) values (${userId}, ${bikeId}, '${beginAt}', ${duration})`;
        let reservation = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                if (err){
                    result = null;
                    console.log(err);
                }
                resolve(result);
            });
        });
        return reservation ? true : false;
    }

    async updateStatus(id, status) {
        let query = `update reservations set status = ${status} where id = ${id}`;
        let reservation = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                if (err) result = null;
                resolve(result);
            });
        });
        return reservation ? true : false;
    }

    async getLastReservationByUserId(userId){
        let query = `select * from reservations where users_id = ${userId} desc limit 1`;
        let reserv = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                if (err) result = null;
                resolve(result[0]);
            });
        });
        return reserv;
    }

    async getStatus(id) {
        let query = `select status from reservations where id = ${id}`;
        let status = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return status;
    }

    async getUserId(id) {
        let query = `select users_id from reservations where id = ${id}`;
        let user_id = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return user_id;
    }

    async getBike(id) {
        let query = `select bikes_id from reservations where id = ${id}`;
        let bike_id = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return bike_id;
    }

    async getCreationDate() {
        let query = `select create_at from reservations where id = ${id}`;
        let createAt = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return createAt;
    }

    async getBeginDate() {
        let query = `select begin_at from reservations where id = ${id}`;
        let createAt = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return createAt;
    }

    async getDuration() {
        let query = `select duration from reservations where id = ${id}`;
        let duration = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return duration;
    }

    async getTimeLeft(id){
        let beginAt = await this.getBeginDate();
        let duration = await this.getDuration();

        // faire le calcul avec l'heure + l'heure du begin en comparant bien si ça change de jour
    }

    async getReservationsByUserId(userId){
        let query = `select * from reservations where users_id = ${userId}`;
        let reservations = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return reservations;
    }

    async getAllReservations(){
        let query = `select * from reservations`;
        let reservations = await new Promise(async resolve => {
            DB.connection.query(query, function (err, result) {
                err || !result.length ? resolve(false)
                    : resolve(result[0]);
            });
        });
        return reservations;
    }
}

module.exports = Reservation;