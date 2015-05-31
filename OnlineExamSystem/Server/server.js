var express = require('express');
var querystring = require('querystring');
var util = require('util');
var app = express();
var formidable = require('formidable');
var fs = require('fs');

require('http').ServerResponse.prototype.download = function(path, filename, fn) {
	var self = this;
	if('function' == typeof filename) {
		fn = filename;
		filename = null;
	}
	this.attachment(filename || path).sendFile(path, function(err) {
		if(fn) return fn(err);
		if(err) {
			self.req.next('ENOENT' == err.code ? null : err);
		}
	});
}

console.log('加载数据库连接池...');
var POOL = require('./platform/mysql/mySQLPool').POOL;

console.log('加载数据请求库...');
var POST = require('./platform/api/post/POST');
var GET = require('./platform/api/get/GET');
var DELETE = require('./platform/api/delete/DELETE');

// POST
app.all('/login', function(req, res) {
	POST.login(req, res);
});
app.all('/regist', function(req, res) {
	POST.regist(req, res);	// 注册账号
});
app.all('/regist/info', function(req, res) {
	POST.registUserInfo(req, res);	// 填写基本信息
});
app.all('/subject/point', function(req, res) {
	POST.addSubjectPoint(req, res);	// 添加试题方向信息
});
app.all('/subject/type', function(req, res) {
	POST.addSubjectType(req, res);	// 添加试题类型信息
});
app.all('/subject/add', function(req, res) {
	POST.addSubject(req, res);	// 添加试题
});
app.all('/subject/answer/chose', function(req, res) {
	POST.addAnswerChose(req, res);
});
app.all('/subject/answer/fill', function(req, res) {
	POST.addAnswerFill(req, res);
});
app.all('/subject/answer/simple', function(req, res) {
	POST.addAnswerSimple(req, res);
});
app.all('/paper/generate', function(req, res) {
	POST.generatePaper(req, res);	// 生成试卷
});

/*****************************************************/
/*****************    文件上传     ********************/
app.post('/upload', function(req, res) {
	var today = new Date();
	var dir = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

	var uploadDir = __dirname + '/uploadDir/';
	var	realDir = uploadDir + dir;
	if(fs.existsSync(uploadDir)) {
		if(fs.existsSync(realDir)) {
		} else {
			console.log('正在创建文件夹:' + realDir);
			fs.mkdirSync(realDir);
		}
	} else {
		fs.mkdirSync(uploadDir);
		console.log('正在创建文件夹:' + uploadDir);
		if(fs.existsSync(realDir)) {
		} else {
			console.log('正在创建文件夹:' + realDir);
			fs.mkdirSync(realDir);
		}
	}

	var form = new formidable.IncomingForm();
	form.uploadDir = realDir;
	form.keepExtensions = true;
	form.maxFieldsSize = 1024 * 1024 * 1024;
	form.parse(req, function(err, field, file) {
		POST.fileUpload(__dirname, file, res);
	});
});

/*****************     获取文件     *******************/
app.all('/uploadDir/*', function(req, res) {
	res.sendFile(__dirname + req.originalUrl);
});
app.all('/download/uploadDir/*', function(req, res) { // 下载
	var downloadPath = __dirname + req.originalUrl.split('/download')[1];
	GET.getFileByUpload(downloadPath,req,res);
});
/*****************************************************/


// DELETE
app.all('/subject/point/:id', function(req, res) {
	DELETE.deletePoint(req, res); // 删除试题方向信息
});
app.all('/subject/type/:id', function(req, res) {
	DELETE.deleteType(req, res); // 删除试题类型信息
});
app.all('/subject/delete', function(req, res) {
	DELETE.deleteSubject(req, res);	// 删除题目
});

// GET
app.get('/subject', function(req, res) {
	GET.getAllSubject(req, res);	// 获取所有试题信息
});
app.get('/subject/info', function(req, res) {
	GET.getSubjectInfo(req, res);	// 获取试题所有方向和类型
});
app.get('/subject/chose/answer/:id', function(req, res) {
	GET.getChoseAnswer(req, res);
});
app.get('/subject/fill/answer/:id', function(req, res) {
	GET.getFillAnswer(req, res);
});
app.get('/subject/simple/answer/:id', function(req, res) {
	GET.getSimpleAnswer(req, res);
});
app.get('/paper', function(req, res) {
	GET.getAllPaper(req, res);	// 获取所有试卷信息
});
app.get('/file', function(req, res) {
	GET.getAllFile(req, res);
});

app.listen(8181);
console.log('服务器已启动,端口8080...');