'use strict';

angular.module('clientApp')
	.controller('fileManagementCtrl', ['$scope','Service', function($scope,Service) {
		var fileData = $scope.fileData = {};
		var fileFun = $scope.fileFun = {};

		$scope.fileData.player = false;
		$scope.fileData.playerData = {};

		var params = {
			limit: 5,
			offset: 0
		}
		Service.getFiles(params).then(function(result) {
			if(result) {
				angular.forEach(result.data, function(n) {
					n.suffix = n.fileName.split('.')[n.fileName.split('.').length - 1];
					n.filePath = '/api/' + n.filePath;
				});
				$scope.fileData.fileList = result.data;
			}
		});

		var checkbox = $('input[type="checkbox"]');
		checkbox.iCheck({
			checkboxClass: 'icheckbox_flat'
		});

		var audio = document.getElementById('audio');
		audio.autoplay = true;

		$scope.fileFun = {
			audioControl: function(file) {
				$scope.fileData.nowPlaySrc = file.filePath;
				$scope.fileData.playerData = file;
				audio.onplay = function(e) {
					$scope.fileData.playerData.duration = e.target.duration;
					$scope.$apply($scope.fileData.playerData.duration);
				}
				audio.ontimeupdate = function(e) {
					$scope.fileData.playerData.currentTime = e.target.currentTime;
					$scope.$apply($scope.fileData.playerData.currentTime);
				}
				$scope.fileData.player = true;
				audio.play();
			},

			player: function(player) {
				$scope.fileData.player = !player;
			}
		}
	}]);