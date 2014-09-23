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

 //five.Board().on("ready", function() {
	var io = require('socket.io').listen(app);
	//var servo = new five.Servo(process.argv[2] || 10);
	//var servo2 = new five.Servo(process.argv[2] || 11);
	 
	io.sockets.on('connection', function(socket) {
		console.log(socket.id);
	    socket.on('message_to_server', function(data) {
	    	//console.log(Math.abs(Math.ceil(170 * data.tiltLR - 180)));
	    	//servo.to(data.tiltLR);
	    	//servo2.to(data.tiltFB);
	    	console.log(data);
	        io.sockets.emit("message_to_client",{ message: data["message"] });
	    });
	});
//});