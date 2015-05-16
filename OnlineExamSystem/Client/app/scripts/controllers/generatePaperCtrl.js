'use strict';

angular.module('clientApp')
	.controller('generatePaperCtrl', ['$scope','Service','$timeout', function($scope,Service,$timeout) {
		var generData = $scope.generData = {};
		var generFun = $scope.generFun = {};

		$scope.generData.subjectPoint = '';
		$scope.generData.subjectType = '';
		$scope.generData.pointSelectOpt = [];
		$scope.generData.typeSelectOpt = [];

		$scope.generData.paper = {};

		$scope.generData.paper.head = '';
		$scope.generData.paper.choseList = [];
		$scope.generData.paper.fillList = [];
		$scope.generData.paper.simpleList = [];
		$scope.generData.paper.chosePerSco = 0;
		$scope.generData.paper.fillPerSco = 0;
		$scope.generData.paper.simplePerSco = 0;
		$scope.generData.paper.paperHead = {};

		Service.getSubjectInfo().then(function(result) {
			if(result) {
				$scope.generData.pointSelectOpt = result.data.point;
				$scope.generData.typeSelectOpt = result.data.type;
			}
		});

		var params = {};
		$scope.$watch('generData.subjectPoint', function(n, o) {
			params.point = n;
			if(n) {
				Service.getSubjectByCondi(params).then(function(result) {
					$scope.generData.subjectList = result.data;
					angular.forEach($scope.generData.subjectList, function(n) {
						angular.forEach($scope.generData.paper.choseList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
						angular.forEach($scope.generData.paper.fillList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
						angular.forEach($scope.generData.paper.simpleList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
					});
					$scope.generFun.initCheck();
				});
			}
		});
		$scope.$watch('generData.subjectType', function(n, o) {
			params.type = n;
			if(n) {
				Service.getSubjectByCondi(params).then(function(result) {
					$scope.generData.subjectList = result.data;
					angular.forEach($scope.generData.subjectList, function(n) {
						angular.forEach($scope.generData.paper.choseList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
						angular.forEach($scope.generData.paper.fillList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
						angular.forEach($scope.generData.paper.simpleList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
					});
					$scope.generFun.initCheck();
				});
			}
		});

		$scope.generFun = {
			getAllSubject: function() {
				Service.getAllSubject().then(function(result) {
					$scope.generData.subjectList = result.data;
					angular.forEach($scope.generData.subjectList, function(n) {
						angular.forEach($scope.generData.paper.choseList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
						angular.forEach($scope.generData.paper.fillList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
						angular.forEach($scope.generData.paper.simpleList, function(_n) {
							if(n.id == _n.id) {
								n.checked = true;
							}
						});
					});
				});
			},

			initCheck: function() {
				$timeout(function() {
					$scope.generData.paper.fillList.totalAnswer = 0;

					var checkbox = $('input[type="checkbox"]');
					checkbox.iCheck({
						checkboxClass: 'icheckbox_flat'
					});
					checkbox.on('ifChecked', function(event) {
						var checked = JSON.parse(event.target.defaultValue);
						if(checked.subjectType == '01') {
							Service.getChoseAnswer(checked.id).then(function(result) {
								checked.answer = result.data.answer;
								$scope.generData.paper.choseList.push(checked);
							});
						}
						if(checked.subjectType == '02') {
							Service.getFillAnswer(checked.id).then(function(result) {
								checked.answer = result.data.answer;
								$scope.generData.paper.fillList.totalAnswer = $scope.generData.paper.fillList.totalAnswer + checked.answer.fill.length;
								$scope.generData.paper.fillList.push(checked);
							});
						}
					});
					checkbox.on('ifUnchecked', function(event) {
						var unchecked = JSON.parse(event.target.defaultValue);
						if(unchecked.subjectType == '01') {
							angular.forEach($scope.generData.paper.choseList, function(n,index) {
								if(unchecked.id == n.id) {
									$scope.generData.paper.choseList.splice(index, 1);
								}
							});
						}
						if(unchecked.subjectType == '02') {
							angular.forEach($scope.generData.paper.fillList, function(n,index) {
								if(unchecked.id == n.id) {
									$scope.generData.paper.fillList.totalAnswer = $scope.generData.paper.fillList.totalAnswer - n.answer.fill.length;
									$scope.generData.paper.fillList.splice(index, 1);
								}
							});
						}
						$scope.$apply($scope.generData.paper);
					});
				},200);
			},

			resetSearch: function() {
				if($scope.generData.subjectPoint != '' || $scope.generData.subjectType != '') {
					$scope.generData.subjectPoint = '';
					$scope.generData.subjectType = '';
					$scope.generFun.getAllSubject();
					$scope.generFun.initCheck();
				}
			},

			generatePaper: function() {
				var params = {}
				if($scope.generData.paper.paperHead.title) {
					params.paperHead = $scope.generData.paper.paperHead.title;
				}
				if($scope.generData.paper.paperHead.time) {
					params.paperTime = $scope.generData.paper.paperHead.time;
				}
				if($scope.generData.paper.choseList.length > 0) {
					params.paperChose = '';
					angular.forEach($scope.generData.paper.choseList, function(n, index) {
						if(index != $scope.generData.paper.choseList.length - 1) {
							params.paperChose = params.paperChose + n.id + '^`';
						} else {
							params.paperChose = params.paperChose + n.id;
						}
					});
				}
				if($scope.generData.paper.fillList.length > 0) {
					params.paperFill = '';
					angular.forEach($scope.generData.paper.fillList, function(n, index) {
						if(index != $scope.generData.paper.fillList.length - 1) {
							params.paperFill = params.paperFill + n.id + '^`';
						} else {
							params.paperFill = params.paperFill + n.id;
						}
					});
				}
				if($scope.generData.paper.simpleList.length > 0) {
					params.paperSimple = '';
					angular.forEach($scope.generData.paper.simpleList, function(n, index) {
						if(index != $scope.generData.paper.simpleList.length - 1) {
							params.paperSimple = params.paperSimple + n.id + '^`';
						} else {
							params.paperSimple = params.paperSimple + n.id;
						}
					});
				}
				if($scope.generData.paper.dateline) {
					params.paperDateline = new Date($scope.generData.paper.dateline).getTime();
				}
				params.paperGenerateTime = new Date().getTime();
				params.paperPerChose = $scope.generData.paper.chosePerSco;
				params.paperPerFill = $scope.generData.paper.fillPerSco;
				params.paperPerSimple = $scope.generData.paper.simplePerSco;

				Service.generatePaper(params).then(function(result) {
					console.log(result);
				});
			}
		}

		$scope.generFun.getAllSubject();
		$scope.generFun.initCheck();
	}]);