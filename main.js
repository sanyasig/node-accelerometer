var http = require('http'),
fs = require('fs');
var five = require("johnny-five");

var app = http.createServer(function (request, response) {
	fs.readFile("test.html", 'utf-8', function (error, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
	});
}).listen(1337);

var pan;
var tilt;
var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
	console.log(socket.id);
	socket.on('message_to_server', function(data) {
		pan = data.pan;
		tilt = data.tilt;
		console.log(data);
		io.sockets.emit("message_to_client",{ message: data["message"] });

	    	// send the pan/tilt info to the arduino 
	    	five.Board().on("ready", function() {
	    		var servo = new five.Servo(process.argv[2] || 10);
	    		var servo2 = new five.Servo(process.argv[2] || 11);
 		
	    	});
	    });
});

