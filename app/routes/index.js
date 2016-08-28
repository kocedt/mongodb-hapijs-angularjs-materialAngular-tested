var defaultRoute = [
	{ 
		method: 'GET',  
		path: '/{param*}', 
		handler: {
			directory: {
				path: '../public',
				listing: true,
				index: true
			}
		}
	}
];

var project = require('./project');
// var user = require('./user');

module.exports = [].concat(defaultRoute, project);
// module.exports = [].concat(cart, user);