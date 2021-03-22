var mysql = require('mysql');


//configurate and connection
var connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recipebook'
 });

 module.exports = connection;