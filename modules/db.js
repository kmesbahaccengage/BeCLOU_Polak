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
