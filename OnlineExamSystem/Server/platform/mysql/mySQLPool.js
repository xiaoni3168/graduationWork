var mysql = require('mysql');
var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'ni19921210',
	database: 'OESystem',
	port: '3306'
});

exports.POOL = pool;