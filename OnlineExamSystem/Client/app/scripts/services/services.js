'use strict';

angular.module('clientApp')
	.service('Service', ['$http', function($http) {
		/** 登录验证*/
		this.login = function(params) {
			return $http.post('/api/login', params).then(function(data, status) {
				return data;
			})
		};

		this.regist = function(params) {
			return $http.post('/api/regist', params).then(function(data, status) {
				return data;
			});
		};

		this.setUserInfo = function(params) {
			return $http.post('/api/regist/info', params).then(function(data, status) {
				return data;
			});
		};

		this.getAllSubject = function() {
			return $http.get('/api/subject').then(function(data, status) {
				return data;
			});
		};

		this.getSubjectByCondi = function(params) {
			return $http.get('/api/subject?point=' + params.point + '&type=' + params.type).then(function(data, status) {
				return data;
			});
		};

		/** 获取所有试题信息*/
		this.getSubjectInfo = function() {
			return $http.get('/api/subject/info').then(function(data, status) {
				return data;
			});
		};

		this.addSubjectPoint = function(params) {
			return $http.post('/api/subject/point', params).then(function(data, status) {
				return data;
			});
		};

		this.addSubjectType = function(params) {
			return $http.post('/api/subject/type', params).then(function(data, status) {
				return data;
			});
		}

		this.deletePoint = function(id) {
			return $http.delete('/api/subject/point/' + id).then(function(data, status) {
				return data;
			});
		};

		this.deleteType = function(id) {
			return $http.delete('/api/subject/type/' + id).then(function(data, status) {
				return data;
			});
		};

		this.deleteSubject = function(params) {
			return $http.delete('/api/subject/delete?id=' + params.id + '&type=' + params.type).then(function(data, status) {
				return data;
			});
		};

		this.addSubject = function(params) {
			return $http.post('/api/subject/add', params).then(function(data, status) {
				return data;
			});
		};

		this.addSubjectAnswer = function(type ,params) {
			return $http.post('/api/subject/answer/' + type, params).then(function(data, status) {
				return data;
			});
		};

		this.getChoseAnswer = function(id) {
			return $http.get('/api/subject/chose/answer/' + id).then(function(data, status) {
				return data;
			});
		};

		this.getFillAnswer = function(id) {
			return $http.get('/api/subject/fill/answer/' + id).then(function(data, status) {
				return data;
			});
		};

		/** 获取所有试题信息*/
		this.generatePaper = function(params) {
			return $http.post('/api/paper/generate', params).then(function(data, status) {
				return data;
			});
		};

		/** 获取所有试卷信息*/
		this.getAllPaper = function() {
			return $http.get('/api/paper').then(function(data, status) {
				return data;
			});
		};

		/** 根据ID获取试题信息*/
		this.getSubjectById = function(id) {
			return $http.get('/api/subject?id=' + id).then(function(data, status) {
				return data;
			});
		};
	}]);