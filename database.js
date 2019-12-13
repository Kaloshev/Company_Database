var mysql = require("mysql");
require("dotenv/config");

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
});

connection.connect((error) => {
    if (error) {
        console.log("Problem with DB connection" + error.message)
    } else {
        console.log("Database connected succesfully")
    }
});

module.exports = connection;