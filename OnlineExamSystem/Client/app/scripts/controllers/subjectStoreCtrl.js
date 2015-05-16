'use strict';

angular.module('clientApp')
	.controller('subjectStoreCtrl', ['$scope','Service','$popover','$timeout','$modal','$location', function($scope,Service,$popover,$timeout,$modal,$location) {
		var data = $scope.data = {};
		var subStoFun = $scope.subStoFun = {};

		$scope.data.pointDelete = false;
		$scope.data.typeDelete = false;
		$scope.data.subjectFindList = [];

		$scope.data.pointPop = {
			title: '添加试题方向',
			contentTemplate: '/views/_addSubjectPointPop.html'
		}
		$scope.data.typePop = {
			title: '添加试题类型',
			contentTemplate: '/views/_addSubjectTypePop.html'
		}
		$scope.data.deletePop = {
			contentTemplate: '/views/_checkForDelete.html'
		}
		$scope.subStoFun = {
			updateSubjectInfo: function() {
				Service.getSubjectInfo().then(function(result) {
					$scope.data.pointList = result.data.point;
					$scope.data.typeList = result.data.type;
				});
			},

			operation: function(type,item) {
				if(type == 'point') {
					if(!$scope.data.pointDelete) {
						$scope.data.currentPoint = item;
					}

					if($scope.data.pointDelete) {
						var delModal = $modal({
							scope: $scope,
							template: 'views/modals/tipInfo.html',
							show: true
						});
						var tipInfo = delModal.$scope.tipInfo = {};
						tipInfo.title = '提示';
						tipInfo.content = '确定删除<em>' + item.pointName + '</em>吗？';
						tipInfo.sure = function() {
							Service.deletePoint(item.id).then(function(result) {
								if(result) {
									delModal.$scope.$hide();
									delModal.$scope.$emit('updateSubjectInfo');
								}
							});
						}
					}
				}
				if(type == 'type') {
					if(!$scope.data.typeDelete) {
						$scope.data.currentType = item;
					}

					if($scope.data.typeDelete) {
						var delModal = $modal({
							scope: $scope,
							template: 'views/modals/tipInfo.html',
							show: true
						});
						var tipInfo = delModal.$scope.tipInfo = {};
						tipInfo.title = '提示';
						tipInfo.content = '确定删除<em>' + item.typeName + '</em>吗？';
						tipInfo.sure = function() {
							Service.deleteType(item.id).then(function(result) {
								if(result) {
									delModal.$scope.$hide();
									delModal.$scope.$emit('updateSubjectInfo');
								}
							});
						}
					}
				}
				if($scope.data.currentType && $scope.data.currentPoint) {
					$scope.subStoFun.loadFindData();
				}
			},

			loadFindData: function() {
				var params = {
					point: $scope.data.currentPoint.pointNum,
					type: $scope.data.currentType.typeNum
				}
				Service.getSubjectByCondi(params).then(function(result) {
					if(result) {
						$scope.data.subjectFindList = result.data;
						if(result.data.length > 0) {
							$timeout(function() {
								angular.forEach(angular.element('span.delete-subject'), function(n, index){
									var subjectDelete = $popover(angular.element(n), {contentTemplate: data.deletePop.contentTemplate, 
										trigger: 'click', placement: 'top'});
									subjectDelete.$scope.sure = function() {
										var params = {
											id: $scope.data.subjectFindList[index].id,
											type: $scope.data.currentType.typeNum
										}
										Service.deleteSubject(params).then(function(subResult) {
											subjectDelete.$scope.$hide();
											$scope.subStoFun.loadFindData();
										});
									}
								});
							},20);
						}
					}
				});
			},

			changeState: function(type) {
				if(type == 'point') {
					$scope.data.pointDelete = !$scope.data.pointDelete;
				}
				if(type == 'type') {
					$scope.data.typeDelete = !$scope.data.typeDelete;
				}
			},

			addSubject: function() {
				$('div.oe-work-body').animate({
					'height': '0'
				},700);
				localStorage.subjectPoint = $scope.data.currentPoint.pointName;
				localStorage.subjectPointNum = $scope.data.currentPoint.pointNum;
				localStorage.subjectType = $scope.data.currentType.typeName;
				localStorage.subjectTypeNum = $scope.data.currentType.typeNum;
				$timeout(function() {
					$location.path('/addSubject');
				},700);
			}
		}
		$scope.subStoFun.updateSubjectInfo();

		$scope.$on('updateSubjectInfo', function() {
			$scope.subStoFun.updateSubjectInfo();
		});

		$timeout(function() {
			var pointDom = '';
			var typeDom = '';
			if(angular.element('#addPointN').length > 0) {
				pointDom = angular.element('#addPointN');
			}
			if(angular.element('#addPointL').length > 0) {
				pointDom = angular.element('#addPointL');
			}
			if(angular.element('#addTypeN').length > 0) {
				typeDom = angular.element('#addTypeN');
			}
			if(angular.element('#addTypeL').length > 0) {
				typeDom = angular.element('#addTypeL');
			}
			var addPointPop = $popover(pointDom, {title: data.pointPop.title,contentTemplate: data.pointPop.contentTemplate, 
				trigger: 'click', placement: 'bottom'});
			var addTypePop = $popover(typeDom, {title: data.typePop.title,contentTemplate: data.typePop.contentTemplate, 
				trigger: 'click', placement: 'bottom'});


			var pointScope = addPointPop.$scope;
			var typeScope = addTypePop.$scope;

			pointScope.fn = {
				addSubjectPoint: function(event) {
					var dom = event.currentTarget;
					var pointName = $(dom).parent().parent().find('input').get(0).value;
					var pointNum = $(dom).parent().parent().find('input').get(1).value;
					if(pointName && pointNum) {
						var params = {
							pointName: pointName,
							pointNum: pointNum
						};
						Service.addSubjectPoint(params).then(function(result) {
							if(result) {
								pointScope.$hide();
								$scope.$broadcast('updateSubjectInfo');
							}
						});
					}
				}
			}
			typeScope.fn = {
				addSubjectPoint: function(event) {
					var dom = event.currentTarget;
					var typeName = $(dom).parent().parent().find('input').get(0).value;
					var typeNum = $(dom).parent().parent().find('input').get(1).value;
					if(typeName && typeNum) {
						var params = {
							typeName: typeName,
							typeNum: typeNum
						};
						Service.addSubjectType(params).then(function(result) {
							if(result) {
								typeScope.$hide();
								$scope.$broadcast('updateSubjectInfo');
							}
						});
					}
				}
			}
			
		},200);
	}]);