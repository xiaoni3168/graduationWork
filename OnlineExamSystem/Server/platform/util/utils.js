var querystring = require('querystring');
var util = require('util');

module.exports = {
	getPostData: function(req) {
		var postData = '';
		req.on('data', function(chunk) {
			postData += chunk;
		});
		req.on('end', function() {
			postData = querystring.parse(postData);
			postData = util.inspect(postData);
			postData = postData.substr(3, postData.lastIndexOf(':') - 4);
			return postData;
		});
	}
}