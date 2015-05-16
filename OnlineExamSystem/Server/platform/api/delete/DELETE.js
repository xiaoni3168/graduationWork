console.log('DELETE 数据请求库正在加载...');
var db = require('../../../platform/mysql/db');

module.exports = {
	deletePoint: function(req, res) {
		var id = req.param('id');
		db.deletePoint(id, res);
	},

	deleteType: function(req, res) {
		var id = req.param('id');
		db.deleteType(id, res);
	},

	deleteSubject: function(req, res) {
		var params = {
			id: req.query.id,
			type: req.query.type
		}
		db.deleteSubject(params, res);
	}
}