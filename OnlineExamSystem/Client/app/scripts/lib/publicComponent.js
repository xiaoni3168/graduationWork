var $component = {
	alertMessage: function(dom, info, timeout, callback) {
		var tip = document.createElement('div');
		$(tip).html(info);
		$(tip).css({
			'position': 'absolute',
  			'height': '70px',
  			'min-width': '200px',
			'background-color': 'rgba(0, 0, 0, 0.7)',
			'top': '30%',
			'left': '45%',
			'color': '#FFFFFF',
			'text-align': 'center',
			'font-size': '25px',
			'border-radius': '10px',
			'line-height': '66px',
			'box-shadow': '0 0 5px #000000'
		});
		$(tip).fadeIn();
		dom.append(tip);
		setTimeout(function() {
			$(tip).fadeOut();
			if(typeof callback == 'function') {
				callback();
			}
		}, timeout);
	}
}