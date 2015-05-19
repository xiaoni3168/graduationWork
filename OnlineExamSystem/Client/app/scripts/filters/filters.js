'use strict';

angular.module('clientApp')
	.filter('musicTime', function() {
		return function(time) {
			var MTime = parseInt((time / 60).toString().split('.')[0]);
			var STime = Math.round(time - MTime * 60);
			if(STime < 10) {
				return '' + MTime + ':0' + STime;
			} else {
				return '' + MTime + ':' + STime;
			}
		}
	})
	.filter('fileSize', function() {
		return function(size) {
			var KB = 1024;
			var MB = 1024 * 1024;
			if(size / KB < 1) {
				return Math.round(size) + 'b';
			}
			if(size / KB > 1 && size / MB < 1) {
				return Math.round(size / KB) + 'kb';
			}
			if(size / MB > 1) {
				return (size / MB).toFixed(1) + 'M';
			}
		}
	})
	.filter('fileIcon', function() {
		return function(suffix) {
			var userNavi = navigator.userAgent.toLowerCase();
			var isWindows = false;
			if(userNavi.indexOf('windows') > 0) {
				isWindows = true;
			}
			if(suffix) {
				suffix = suffix.toLowerCase();
			}
			switch(suffix) {
				case 'docx':
					if(isWindows) {
						return '/images/fileicon/docx_win.png';
						break;
					} else {
						return '/images/fileicon/docx_mac.png';
						break;
					}
				case 'doc':
					if(isWindows) {
						return '/images/fileicon/docx_win.png';
						break;
					} else {
						return '/images/fileicon/docx_mac.png';
						break;
					}
				case 'xlsx':
					if(isWindows) {
						return '/images/fileicon/xlsx.png';
						break;
					} else {
						return '/images/fileicon/xlsx.png';
						break;
					}
				case 'txt':
					return '/images/fileicon/text.png';
					break;
				case 'pdf':
					return '/images/fileicon/pdf.png';
					break;
				case 'mp3':
					return '/images/fileicon/mp3.png';
					break;
				case 'zip':
					return '/images/fileicon/zip.png';
					break;
				case 'rar':
					return '/images/fileicon/rar.png';
					break;
				case 'jpg':
					return '/images/fileicon/jpeg.png';
					break;
				case 'mov':
					return '/images/fileicon/mov.png';
					break;
			}
		}
	});