console.log('GET 数据请求库正在加载...');
var db = require('../../../platform/mysql/db');

module.exports = {
	getAllSubject: function(req, res) {
		if(req.query.point || req.query.type) {
			var params = {};
			if(req.query.point != '' && req.query.point != 'undefined') {
				params.subjectPoint = req.query.point;
			}
			if(req.query.type != '' && req.query.type != 'undefined') {
				params.subjectType = req.query.type;
			}
			db.oeGetSubjectByCondi(params,res);
		} else if(req.query.id) {
			db.oeGetSubjectById(req.query.id, res);
		} else {
			db.oeGetAllSubject(res);
		}
	},

	getSubjectInfo: function(req, res) {
		db.oeGetSubjectInfo(res);
	},

	getChoseAnswer: function(req, res) {
		var id = req.param('id');
		db.oeGetChoseAnswer(id, res);
	},

	getFillAnswer: function(req, res) {
		var id = req.param('id');
		db.oeGetFillAnswer(id, res);
	},

	getSimpleAnswer: function(req, res) {
		var id = req.param('id');
		db.oeGetSimpleAnswer(id, res);
	},

	getAllPaper: function(req, res) {
		db.oeGetAllPaper(res);
	},

	getAllFile: function(req, res) {
		if(req.query.offset && req.query.limit) {
			if(req.query.type) {
				var params = {};
				if(req.query.offset != '' && req.query.offset != 'undefined') {
				params.offset = req.query.offset;
				}
				if(req.query.limit != '' && req.query.limit != 'undefined') {
					params.limit = req.query.limit;
				}
				if(req.query.type != '' && req.query.type != 'undefined') {
					params.type = req.query.type;
				}
				db.getAllFileByType(params, res);
			} else {
				var params = {};
				if(req.query.offset != '' && req.query.offset != 'undefined') {
				params.offset = req.query.offset;
				}
				if(req.query.limit != '' && req.query.limit != 'undefined') {
					params.limit = req.query.limit;
				}
				db.getAllFile(params, res);
			}
		}
	},

	getFileByUpload: function(path, req, res) {
		var uploadName = req.originalUrl.split('/download')[1];
		db.oeGetFileByUpload(path, uploadName, res);
	}
}