var mysql = require("mysql");
require("dotenv/config");

var connection = mysql.createConnection({
    host: "localhost",
    user: 'gjorgji',
    password: "123qweasdzxc",
    database: "Company_DB",
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