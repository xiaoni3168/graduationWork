'use strict';

angular.module('clientApp')
	.controller('takeExamCtrl', ['$scope','Service', function($scope,Service) {
		var examData = $scope.examData = {};
		var examFun = $scope.examFun = {};

		$scope.examFun = {
			getAllPaper: function() {
				Service.getAllPaper().then(function(result) {
					console.log(result)
					$scope.examData.peperList = result.data;
				});
			},

			refresh: function() {
				$scope.examFun.getAllPaper();
			}
		}
		$scope.examFun.getAllPaper();
		
	}]);