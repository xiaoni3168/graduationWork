var mysql = require('mysql');
var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'ni19921210',
	database: 'OESystem',
	port: '3306'
});
pool.getConnection(function(err, conn) {
	if(err) {
		process.exit(405);
	}
});

process.on('exit', function(e) {
	if(e == 405) {
		console.log('ERROR: 数据库未开启,正在关闭进程...')
	}
});
exports.POOL = pool;