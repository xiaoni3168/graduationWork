'use strict';

angular.module('clientApp')
	.controller('loginCtrl', ['$rootScope','$scope','Service','$timeout','$modal','$tooltip','$location', function($rootScope,$scope,Service,$timeout,$modal,$tooltip,$location) {
		var fn = $scope.fn = {};
		var data = $scope.data = {};

		data.userSex = 1;
		data.userStatus = 0;
		data.userRegistStatus = 0;	// 学生

		$.fn.bootstrapSwitch.defaults.onColor = 'success';
		$.fn.bootstrapSwitch.defaults.offColor = 'warning';
		$.fn.bootstrapSwitch.defaults.onText = '我是学生';
		$.fn.bootstrapSwitch.defaults.offText = '我是老师';
		$.fn.bootstrapSwitch.defaults.labelText = '选择身份';
		$.fn.bootstrapSwitch.defaults.size = 'mini';
		$('#loginStatusCheck').bootstrapSwitch();
		$('#registStatusCheck').bootstrapSwitch();

		$('#loginStatusCheck').on('switchChange.bootstrapSwitch', function(event, state) {
			if(state) {
				data.userStatus = 0;	// 学生
			} else {
				data.userStatus = 1;	// 老师
			}
		});

		$('#registStatusCheck').on('switchChange.bootstrapSwitch', function(event, state) {
			if(state) {
				data.userRegistStatus = 0;	// 学生
			} else {
				data.userRegistStatus = 1;	// 老师
			}
		});

		$scope.fn = {
			login: function() {
				if($scope.data.loginUser && $scope.data.loginPassword) {
					var params = {
						username: $scope.data.loginUser,
						password: $scope.data.loginPassword,
						status: $scope.data.userStatus
					}
					Service.login(params).then(function(result) {
						if(result) {
							if(result.data.flag) {
								localStorage.isLogin = true;
								localStorage.id = result.data.id;
								localStorage.status = $scope.data.userStatus;
								$location.path('/dashboard');
								$component.alertMessage($(document.body), '登录成功', 1500);
							} else {
								alert(result.data.message);
							}
						}
					});
				}
			},

			toRegist: function() {
				$('#loginContent').fadeOut();
				$timeout(function() {
					$('#registContent').fadeIn();
				},500);
			},

			readRule: function() {
				var ruleModal = $modal({
					scope: $scope,
					template: 'views/modals/ruleModal.html',
					show: true
				});
				ruleModal.$scope.acept = function() {
					$scope.data.aceptRule = true;
					this.$hide();
				}
			},

			registNext: function() {
				var params = {
					username: $scope.data.username,
					password: $scope.data.password,
					status: $scope.data.userRegistStatus
				};
				var flag = false;
				if($scope.data.aceptRule) {
					Service.regist(params).then(function(result) {
						if(result.data.flag) {
							$scope.data.userId = result.data.id;

							var firstRegist = $('div.oe-regist-panel');
							var stuRegist = $('div.oe-regist-panel-stu');
							var teachRegist = $('div.oe-regist-panel-teach');
							firstRegist.css({
								'transition': '500ms',
								'transform': 'scale(0,0)'
							});
							$timeout(function(){
								firstRegist.css({'display':'none'});
								if(data.userRegistStatus == 0) {
									teachRegist.css({
										'height': '0'
									});
									stuRegist.css({
										'transition': '500ms',
										'transform': 'scale(1,1)'
									});
								}
								if(data.userRegistStatus == 1) {
									stuRegist.css({
										'height': '0'
									});
									teachRegist.css({
										'transition': '500ms',
										'transform': 'scale(1,1)'
									});
								}
							},500);
						}
					});
				}
			},

			registSubmit: function() {
				var params = {}
				params.userId = $scope.data.userId;
				params.college = $scope.data.college;
				if($scope.data.stuNumber) {
					params.stuNumber = $scope.data.stuNumber;
				} else {
					params.stuNumber = '';
				}
				if($scope.data.teachNumber) {
					params.teachNumber = $scope.data.teachNumber;
				} else {
					params.teachNumber = '';
				}
				params.sex = $scope.data.userRegistStatus;

				Service.setUserInfo(params).then(function(result) {
					console.log(result);
				});
			}
		}
	}]);