'use strict';

angular.module('clientApp')
	.controller('addSubjectCtrl', ['$scope','$timeout','$dropdown','Service','$modal', function($scope,$timeout,$dropdown,Service,$modal) {
		$('div.oe-work-body').animate({
			'height': '71%'
		}, 700);

		var addData = $scope.addData = {};
		var addFun = $scope.addFun = {};

		addData.subjectPoint = localStorage.subjectPoint;
		addData.subjectPointNum = localStorage.subjectPointNum;
		addData.subjectType = localStorage.subjectType;
		addData.subjectTypeNum = localStorage.subjectTypeNum;

		addData.musicPlay = false;

		addData.uploadFile = [];

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
			},

			upload: function(event) {
				var fd = new FormData();
				var reader = new FileReader();
				var xhr = new XMLHttpRequest();
				var file = $('#fileupload').get(0).files[0];
				reader.readAsDataURL(file);
				file.suffix = file.name.split('.')[file.name.split('.').length - 1];
				fd.append('fileupload', file);
				$scope.addData.uploadFile.push(file);
				reader.onload = function(e) {
					if(xhr.upload) {
						xhr.upload.addEventListener('progress', function(e) {
							$timeout(function() {
								file.loadState = {
									width: parseInt(100.0 * e.loaded / e.total) +'%',
									lineHeight: '12px'
								}
								file.persent = parseInt(100.0 * e.loaded / e.total) +'%';
							},10);
						})
						xhr.onreadystatechange = function(e) {
							if(xhr.readyState == 4) {
								if(xhr.status == 202) {
									console.log('上传成功')
									$timeout(function() {
										$scope.fileInfo = JSON.parse(xhr.response);
										$scope.fileInfo.filePath = '/api' + $scope.fileInfo.filePath;
									},100);
								}
							}
						}
					}
					xhr.open('POST', '/api/upload', true);
					xhr.send(fd);
				}
			},

			musicOperation: function(flag) {
				if($scope.addData.uploadFile[0].suffix == 'mp3') {
					var audio = document.getElementById('audio');
					if(!flag) {
						audio.play();
					} else {
						audio.pause();
					}
					$scope.addData.musicPlay = !flag;
				}
				if($scope.addData.uploadFile[0].suffix.toLowerCase() == 'mov') {
					var movModal = $modal({
						scope: $scope,
						template: 'views/modals/movModal.html',
						show: true
					});
				}
				
			}
		}
	}]);