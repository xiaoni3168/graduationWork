'use strict';

angular.module('clientApp')
	.controller('takeExamCtrl', ['$scope','Service', function($scope,Service) {
		var examData = $scope.examData = {};
		var examFun = $scope.examFun = {};

		$scope.examData.doExam = false;
		$scope.examData.totalFillAnswer = 0;

		$scope.examFun = {
			getAllPaper: function() {
				Service.getAllPaper().then(function(result) {
					$scope.examData.peperList = result.data;
				});
			},

			refresh: function() {
				$scope.examFun.getAllPaper();
			},

			exam: function(paper) {
				var choseIds = [],
					fillIds = [],
					simpleIds = [];
				if(paper.paperChose) {
					choseIds = paper.paperChose.split('^`');
					paper.choseList = [];
					angular.forEach(choseIds, function(n) {
						Service.getSubjectById(n).then(function(result) {
							if(result) {
								Service.getChoseAnswer(result.data.id).then(function(_result) {
									delete _result.data.answer.subjectAnswer;
									result.data.answer = _result.data.answer;
									paper.choseList.push(result.data);
								});
							}
						});
					});
				}
				if(paper.paperFill) {
					fillIds = paper.paperFill.split('^`');
					paper.fillList = [];
					angular.forEach(fillIds, function(n) {
						Service.getSubjectById(n).then(function(result) {
							if(result) {
								Service.getFillAnswer(result.data.id).then(function(_result) {
									$scope.examData.totalFillAnswer = $scope.examData.totalFillAnswer + _result.data.answer.fill.length;
									paper.fillList.push(result.data);
								});
							}
						});
					});
				}
				if(paper.paperSimple) {
					simpleIds = paper.paperSimple.split('^`');
					paper.simpleList = [];
					angular.forEach(simpleIds, function(n) {
						Service.getSubjectById(n).then(function(result) {
							if(result) {
								paper.simpleList.push(result.data);
							}
						});
					});
				}
				$scope.examData.currentPaper = paper;
				$scope.examData.doExam = true;
			}
		}
		$scope.examFun.getAllPaper();
		
	}]);