'use strict';

angular.module('clientApp')
	.directive('header', ['$rootScope','$location', function($rootScope,$location) {
		return {
			restrict: 'EA',
			templateUrl: 'views/_header.html',
			controller: ['$scope', function($scope) {
				var headFun = $scope.headFun = {};

				$scope.headFun = {
					home: function() {
						$location.path('/dashboard');
					},

					loginOut: function() {
						$location.path('/');
						$component.alertMessage($(document.body), '退出成功!', 1500);
					}
				}
			}]
		}
	}])
	.directive('leftBar', ['$rootScope','$location', function($rootScope,$location) {
		return {
			restrict: 'EA',
			templateUrl: 'views/_leftBar.html',
			controller: ['$scope', function($scope) {
				var data = $scope.data = {};
				var fn = $scope.fn = {};

				data.userStatus = localStorage.status;
				$scope.fn = {
					hover: function(index) {
						$scope.data.currHover = index;
					},

					leave: function() {
						$scope.data.currHover = -1;
					},

					subjectStore: function() {
						$location.path('/subjectStore');
					},

					generatePaper: function() {
						$location.path('/generatePaper');
					},

					takeExam: function() {
						$location.path('/takeExam');
					},

					fileManagement: function() {
						$location.path('/fileManagement');
					},

					queryScore: function() {
						$location.path('/queryScore');
					}
				}
			}]
		}
	}])
	.directive('footer', ['$location', function($location) {
		return {
			restrict: 'EA',
			templateUrl: 'views/_footer.html'
		}
	}])
	.directive('oneChange', ['$parse','$timeout', function($parse,$timeout) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('change', function(event) {
					var fn = $parse(attrs.oneChange);
					fn(scope, {$event:event});
				});
			}
		}
	}])