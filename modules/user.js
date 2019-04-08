let DB = require('./db');
let sha256 = require('sha256');

class User {
    constructor() {
    }

    async getUsers() {
        let users = await new Promise(async resolve => {
            DB.connection.query("SELECT * FROM users", function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
        return users;
    };

    async getUserInfo(email) {
        console.log("Get User Info" + email);
        let user = await new Promise(async resolve => {
            DB.connection.query(`SELECT * FROM users where email = '${email}'`, function (err, result) {
                if (err) throw err;
                resolve(result[0]);
            });
        });
        return user;
    };

    async login(email, passwordInput) {
        console.log("Login:" + email);
        let userId = await this.getUserId(email);
        if (!userId) return null;
        console.log(userId);
        let {activated, password} = await new Promise(async resolve => {
            DB.connection.query(`SELECT activated, password FROM login where users_id = \'${userId}'`, function (err, result) {
                if (err) throw err;
                resolve(result[0]);
            });
        });
        if (password === sha256(passwordInput) && activated === 2) {
            return await this.getUserInfo(email);
        } else return null;
    };

    async getUserId(email) {
        console.log("Get User ID:" + email);
        return await new Promise(async resolve => {
            let sql = `SELECT id FROM users where email = '${email}'`;
            DB.connection.query(sql, function (err, result) {
                if (err) throw err;
                result.length > 0 ? resolve(result[0].id) : resolve(0);
            });
        });
    };

    async validateUser(userId, hash) {
        console.log("Validate User:" + userId);
        let response = await new Promise(async resolve => {
            let sql = `SELECT hash FROM login where users_id = \'${userId}\'`;
            DB.connection.query(sql, function (err, result, fields) {
                resolve(result[0].hash);
            });
        });
        if (hash === response) {
            let sql = `UPDATE login SET activated = 2 where users_id = \'${userId}\'`;
            await new Promise(async resolve => {
                DB.connection.query(sql, function (err, result, fields) {
                    resolve();
                });
            });
            return true;
        } else
            return false;
    };

    async register(email, firstname, lastname, password, hash) {
        console.log("Register:" + email);
        let response = await new Promise(async resolve => {
            let sql = `INSERT INTO users (email, firstname, lastname) VALUES (\'${email}\', \'${firstname}\', \'${lastname}\')`;
            DB.connection.query(sql, function (err, result) {
                resolve(result);
            });
        });
        if (response) {
            let userId = await this.getUserId(email);
            await new Promise(async resolve => {
                let sql = `INSERT INTO login (users_id, password, hash) VALUES (\'${userId}\', \'${sha256(password)}\', \'${hash}\')`;
                DB.connection.query(sql, function (err, result) {
                    if (err) throw err;
                    resolve(result);
                });
            });
        }
        return response ? this.getUserInfo(email) : null;
    };
}

module.exports = User;
