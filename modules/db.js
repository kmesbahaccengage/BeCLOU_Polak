let mysql = require('mysql');

class DB {
    constructor() {
    }

     static get connection() {
        return mysql.createConnection({
            host: "localhost",
            user: "khaled",
            password: "mysql",
            database: "mydb"
        });
    }

    connect() {
        DB.connection.connect(function (err) {
            if (err) throw err;
            console.log("MySQL connected!");
        });
    };
}
module.exports = DB;
/*
let connection = mysql.createConnection({
    host: "localhost",
    user: "khaled",
    password: "mysql",
    database: "mydb"
});
let db = {};

db.connect = async function () {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("MySQL connected!");
    });
};

db.getUsers = async function () {
    let users = await new Promise(resolve => {
        connection.query("SELECT * FROM users", function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    });
    return users;
};

db.getUserInfo = async function (email) {
    console.log("Get User Info" + email);
    let user = await new Promise(resolve => {
        connection.query(`SELECT * FROM users where email = '${email}'`, function (err, result) {
            if (err) throw err;
            resolve(result[0]);
        });
    });
    return user;
};

db.login = async function (user) {
    console.log("Login:" + user.email);
    let userId = await db.getUserId(user.email);
    if (!userId) return null;
    console.log(userId);
    let {activated, password} = await new Promise(resolve => {
        connection.query(`SELECT activated, password FROM login where users_id = \'${userId}'`, function (err, result) {
            if (err) throw err;
            resolve(result[0]);
        });
    });
    if (password === sha256(user.password) && activated === 2) {
        return await db.getUserInfo(user.email);
    } else return null;
};

db.getUserId = async function (email) {
    console.log("Get User ID:" + email);
    return await new Promise(resolve => {
        let sql = `SELECT id FROM users where email = '${email}'`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            result.length > 0 ? resolve(result[0].id) : resolve(0);
        });
    });
};

db.validateUser = async function (userId, hash) {
    console.log("Validate User:" + userId);
    let response = await new Promise(resolve => {
        let sql = `SELECT hash FROM login where users_id = \'${userId}\'`;
        connection.query(sql, function (err, result, fields) {
            resolve(result[0].hash);
        });
    });
    if (hash === response) {
        let sql = `UPDATE login SET activated = 2 where users_id = \'${userId}\'`;
        await new Promise(resolve => {
            connection.query(sql, function (err, result, fields) {
                resolve();
            });
        });
        return true;
    } else
        return false;
};

db.register = async function (user, hash) {
    console.log("Register:" + user.email);
    let response = await new Promise(resolve => {
        let sql = `INSERT INTO users (email, firstname, lastname) VALUES (\'${user.email}\', \'${user.firstname}\', \'${user.lastname}\')`;
        connection.query(sql, function (err, result) {
            resolve(result);
        });
    });
    if (response) {
        let userId = await db.getUserId(user.email);
        await new Promise(resolve => {
            let sql = `INSERT INTO login (users_id, password, hash) VALUES (\'${userId}\', \'${sha256(user.password)}\', \'${hash}\')`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
    }
    console.log("ok");
    return response ? db.getUserInfo(user.email) : null;
};

module.exports = db;*/
