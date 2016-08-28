// package init
const Hapi 		= require('hapi');
const Inert 	= require('inert');
const Vision 	= require('vision');
const Path 		= require('path');
const Pack 		= require('../package');
const mongoose 	= require('mongoose');

mongoose.connect('mongodb://localhost/softwareHouse');
var server = new Hapi.Server({connections: { routes: { files: {
	relativeTo: Path.join(__dirname, '../public')
}}}});
server.connection({ port: 8888, routes: { cors: true } });

//Register Plugin
server.register([Inert, Vision], 
	(err) => {
		if(err) {
			console.log(err);
		}
		else {
			console.log('plugin > OK');
		}
	}
);

//routes init
var routes = require('./routes');
server.route(routes);

server.start(function(){
	console.log('server > OK @', server.info.uri);
});