'use strict';

angular.module('clientApp')
	.controller('fileManagementCtrl', ['$scope','Service', function($scope,Service) {
		var fileData = $scope.fileData = {};
		var fileFun = $scope.fileFun = {};

		$scope.fileData.player = false;			// 播放器面板是否打开
		$scope.fileData.playerState = false;	// 音乐播放状态
		$scope.fileData.playerLoop = false;		// 是否单曲循环
		$scope.fileData.playerData = {};

		var params = {
			limit: 6,		// 分页每页条数
			offset: 0 		// 偏移量
		}
		Service.getFiles(params).then(function(result) {
			if(result) {
				angular.forEach(result.data, function(n) {
					n.suffix = n.fileName.split('.')[n.fileName.split('.').length - 1];
					n.filePath = '/api' + n.filePath;
				});
				$scope.fileData.fileList = result.data;
			}
		});

		var checkbox = $('input[type="checkbox"]');
		checkbox.iCheck({
			checkboxClass: 'icheckbox_flat'
		});

		// H5 audio播放器
		var audio = document.getElementById('audio');
		audio.autoplay = true;

		$scope.fileFun = {
			audioControl: function(file) {
				$scope.fileData.nowPlaySrc = file.filePath;	// 音乐播放地址
				$scope.fileData.playerData = file;
				audio.onplay = function(e) {
					$scope.fileData.playerData.duration = e.target.duration;	// 音乐总时长
					$scope.fileData.playerData.volume = e.target.volume;
					$scope.$apply($scope.fileData.playerData.duration);

					ID3.loadTags($scope.fileData.nowPlaySrc, function() {
						var tags = ID3.getAllTags($scope.fileData.nowPlaySrc);
						var image = tags.picture;
						if(image) {
							var base64String = '';
							for(var i = 0; i < image.data.length; i ++) {
								base64String += String.fromCharCode(image.data[i]);
							}
							var base64 = 'data:' + image.format + ';base64,' + window.btoa(base64String);
							$scope.fileData.playerData.picture = base64;
						} else {
							$scope.fileData.playerData.picture = '';
						}
					},{
				        tags: ["title","artist","album","picture"]
			      	});

			      	var musicArrow = document.getElementById('musicArrow');
			      	var musicBar = document.getElementById('musicBar');
			      	var disX = 0;
			      	var timePerWidth = $scope.fileData.playerData.duration / 168;
			      	if(musicArrow) {
			      		musicArrow.onmousedown = function(event) {
			      			disX = event.clientX - this.offsetLeft;
			      			document.onmousemove = function(event) {
			      				musicBar.style.width = (event.clientX - disX - 70) + 'px';
			      				audio.currentTime = timePerWidth * (event.clientX - disX - 70);
			      				if((event.clientX - disX - 70) > 168) {
			      					musicBar.style.width = '168px';
			      				}
			      			};
			      			document.onmouseup = function() {
			      				document.onmousemove = null;
			      				document.onmouseup = null;
			      			};
			      		};
			      	}

			      	var volumeArrow = document.getElementById('volumeArrow');
			      	var volumeBar = document.getElementById('volumeBar');
			      	var disY = 0;
			      	var volumePerHeight = $scope.fileData.playerData.volume / 83;
			      	if(volumeArrow) {
			      		volumeArrow.onmousedown = function(event) {
			      			disY = event.clientY - this.offsetTop;
			      			document.onmousemove = function(event) {
			      				volumeBar.style.height = (event.clientY - disY -70) + 'px';
			      				if((83 - (event.clientY - disY - 70)) < 2) {
			      					volumeBar.style.height = '83px';
			      					audio.volume = 0;
			      				} else if((83 - (event.clientY - disY - 70)) > 83) {
			      					volumeBar.style.height = '2px';
			      					audio.volume = 1;
			      				} else {
			      					audio.volume = volumePerHeight * (83 - (event.clientY - disY - 70));
			      				}
			      			};
			      			document.onmouseup = function() {
			      				document.onmousemove = null;
			      				document.onmouseup = null;
			      			};
			      		};
			      	}
				}
				audio.ontimeupdate = function(e) {
					$scope.fileData.playerData.currentTime = e.target.currentTime;

					document.getElementById('musicBar').style.width = e.target.currentTime * 168 / $scope.fileData.playerData.duration + 'px';

					if($scope.fileData.playerData.currentTime == $scope.fileData.playerData.duration) {
						$scope.fileData.playerState = false;
						$('#musicPicture').css({
							'-webkit-transform': 'rotate(0deg)',
							'-webkit-animation-play-state': 'paused'
						});
						$scope.$apply($scope.fileData.playerState);
					}
					$scope.$apply($scope.fileData.playerData.currentTime);
				}
				$scope.fileData.player = true;
				$scope.fileData.playerState = true;
				audio.play();
			},

			player: function(player) {
				$scope.fileData.player = !player;
			},

			playerState: function(playerState) {
				var musicPicture = $('#musicPicture');
				$scope.fileData.playerState = !playerState;
				if($scope.fileData.playerState) {
					audio.play();
					musicPicture.css({
						'-webkit-animation-play-state': 'running'
					});
				} else {
					audio.pause();
					musicPicture.css({
						'-webkit-animation-play-state': 'paused'
					});
				}
			},

			setLoop: function(playerLoop) {
				$scope.fileData.playerLoop = !playerLoop;
				if($scope.fileData.playerLoop) {
					audio.loop = true;
				} else {
					audio.loop = false;
				}
			}
		}
	}]);