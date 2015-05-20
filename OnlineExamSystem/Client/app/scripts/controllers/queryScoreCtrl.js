'use strict';

angular.module('clientApp')
	.controller('queryScoreCtrl', ['$scope', function($scope) {
		var scoreData = $scope.scoreData = {}
		var scoreFun = $scope.scoreFun = {}

		scoreData.scoreList = [
			{studentNum: '11051121X', stuName: '张三', paper: '期中考试', examTime: new Date().getTime(), score: 90},
			{studentNum: '11051121X', stuName: '张三', paper: '全国英语等级考试', examTime: new Date().getTime(), score: 87},
			{studentNum: '11051121X', stuName: '张三', paper: '期末模拟考试', examTime: new Date().getTime(), score: 60},
			{studentNum: '11051121X', stuName: '张三', paper: '期末考试', examTime: new Date().getTime(), score: 88}
		];

		$scope.scoreFun = {
			query: function() {
				if($scope.scoreData.queryNum == '11051121X') {
					$scope.scoreData.currentQuery = $scope.scoreData.scoreList;
				} else {
					$scope.scoreData.currentQuery = [];
				}
			}
		}
	}]);