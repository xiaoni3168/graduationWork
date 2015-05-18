console.log('POST 数据请求库正在加载...');
var querystring = require('querystring');
var util = require('util');
var db = require('../../../platform/mysql/db');

module.exports = {
	login: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeLogin(postData, res);
		});
	},

	regist: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeUserInsert(postData, res);
		});
	},

	registUserInfo: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeUserInfoInsert(postData, res);
		});
	},

	addSubject: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			console.log(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeAddSubject(postData, res);
		});
	},

	addSubjectPoint: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeAddSubjectPoint(postData, res);
		});
	},

	addSubjectType: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeAddSubjectType(postData, res);
		});
	},

	addAnswerChose: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeAddAnswerChose(postData, res);
		});
	},

	addAnswerFill: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeAddAnswerFill(postData, res);
		});
	},

	addAnswerSimple: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			// postData = querystring.parse(postData);
			// postData = util.inspect(postData);
			// postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			db.oeAddAnswerSimple(postData, res);
		});
	},

	generatePaper: function(req, res) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			db.oeGeneratePaper(postData, res);
		});
	},

	fileUpload: function(baseDir, file, res) {
		var params = {
			fileName: file.fileupload.name,
			fileSize: file.fileupload.size,
			filePath: file.fileupload.path.replace(baseDir,''),
			fileUploadTime: new Date().getTime()
		}
		db.oeFileUpload(params, res);
	}
}