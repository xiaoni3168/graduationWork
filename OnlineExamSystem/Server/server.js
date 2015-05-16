var express = require('express');
var querystring = require('querystring');
var util = require('util');
var app = express();

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

app.listen(8080);
console.log('服务器已启动,端口8080...');