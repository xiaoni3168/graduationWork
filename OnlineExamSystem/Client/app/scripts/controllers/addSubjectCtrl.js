'use strict';

angular.module('clientApp')
	.controller('addSubjectCtrl', ['$scope','$timeout','$dropdown','Service', function($scope,$timeout,$dropdown,Service) {
		$('div.oe-work-body').animate({
			'height': '71%'
		}, 700);

		var addData = $scope.addData = {};
		var addFun = $scope.addFun = {};

		addData.subjectPoint = localStorage.subjectPoint;
		addData.subjectPointNum = localStorage.subjectPointNum;
		addData.subjectType = localStorage.subjectType;
		addData.subjectTypeNum = localStorage.subjectTypeNum;

		$scope.addData.subjectPreNum = addData.subjectPointNum + addData.subjectTypeNum;

		addData.choses = [];
		addData.tempSubject = [];

		var choseCount = 0;
		$scope.addFun = {
			addItem: function() {
				var item = {
					index: choseCount,
					name: '',
					value: '',
					checked: false
				};
				$scope.addData.choses.push(item);
				choseCount++;
			},

			removeItem: function($index) {
				angular.forEach($scope.addData.choses, function(n, index) {
					if(index == $index) {
						$scope.addData.choses.splice(index,1);
					}
				});
			},

			addSubject: function() {
				$scope.addData.addSubject = !$scope.addData.addSubject;
				if($scope.addData.addSubject) {
					$timeout(function() {
						$('div.oe-subject-chose').animate({'opacity': '1'},'fast');
					},20);
				}
			},

			setAnswer: function(item) {
				angular.forEach($scope.addData.choses, function(n) {
					if(item.index == n.index) {
						n.checked = !n.checked;
					}
				});
			},

			cancelEdit: function() {
				$scope.addData.addSubject = false;
			},

			submitSubject: function() {
				var submitParam = {
					subjectNum: $scope.addData.subjectPreNum + $scope.addData.subjectSufNum,
					subjectPoint: $scope.addData.subjectPointNum,
					subjectType: $scope.addData.subjectTypeNum,
					subjectContent: $scope.addData.subjectContent
				}
				Service.addSubject(submitParam).then(function(result) {
					if(result) {
						var temp = {
							subjectNum: submitParam.subjectNum,
							subjectContent: submitParam.subjectContent
						}
						$scope.addData.tempSubject.push(temp);
						var subjectAnswerParam = {
							subjectNum: submitParam.subjectNum,
							subjectId: result.data.id
						}
						if($scope.addData.subjectTypeNum == '01') {
							angular.forEach($scope.addData.choses, function(n, index) {
								if(index != 0) {
									subjectAnswerParam.subjectIndex = subjectAnswerParam.subjectIndex + '^`' + n.name;
									subjectAnswerParam.subjectValue = subjectAnswerParam.subjectValue + '^`' + n.value;
								} else {
									subjectAnswerParam.subjectIndex = n.name;
									subjectAnswerParam.subjectValue = n.value;
								}
								if(n.checked) {
									subjectAnswerParam.subjectAnswer = n.name;
								}
							});
							Service.addSubjectAnswer('chose', subjectAnswerParam).then(function(subResult) {
								if(subResult) {
									$scope.addData.addSubject = false;
								}
							});
						}
						if($scope.addData.subjectTypeNum == '02') {
							angular.forEach($scope.addData.choses, function(n, index) {
								if(index != 0) {
									subjectAnswerParam.subjectAnswer = subjectAnswerParam.subjectAnswer + '^`' + n.value;
								} else {
									subjectAnswerParam.subjectAnswer = n.value;
								}
							});
							Service.addSubjectAnswer('fill', subjectAnswerParam).then(function(subResult) {
								if(subResult) {
									$scope.addData.addSubject = false;
								}
							});
						}
						if($scope.addData.subjectTypeNum == '03') {
							subjectAnswerParam.subjectAnswer = $scope.addData.subjectAnswer;
							Service.addSubjectAnswer('simple', subjectAnswerParam).then(function(subResult) {
								if(subResult) {
									$scope.addData.addSubject = false;
								}
							});
						}
					}
				});
			}
		}
	}]);