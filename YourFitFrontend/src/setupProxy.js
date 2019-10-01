const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy([ '/api', '/auth', '/users', '/api/diagnostic', '/login_success', '/login_failure' ], {
			target: 'http://localhost:5000'
		})
	);
};
