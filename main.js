var http = require('http'),
fs = require('fs');
var light_status = 'aaa';
var send_status = 'eee';
//var five = require("johnny-five");
//var board = new five.Broad();
var SerialPort = require("serialport").SerialPort;
 serialPort = new SerialPort("/dev/ttyACM0", {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false
    });

var arduino_pan = 10;
var servo;
var servo2;

//five.Board().on("ready", function() {
 // console.log("Connectsed");
  // Initialize the servo
 // servo = new five.Servo(process.argv[2] || 9);
  //servo2 = new five.Servo(process.argv[2] || 8);
  // console.log(pan);
   //console.log("value of pa");
   //
  //servo.to(90);
  //servo2.to(90);
//}/);

//serialPort.on("open", function () {

 // console.log('open');
 // serialPort.on('data', function(data) {
  //  console.log('data received: ' + data);
// });
 // serialPort.write("aws", function(err, results) {
  //  console.log('err ' + err);
   // console.log('results ' + results);
 // });
//});

var app = http.createServer(function (request, response) {
	fs.readFile("test.html", 'utf-8', function (error, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
	});
}).listen(1337);

serialPort.on("open", function () {
 console.log('open');
 serialPort.write("SaaaE",function(){
	console.log("sending data");
});
});
serialPort.on("close", function () {
 console.log('close');
});
var pan;
var tilt;

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
console.log(socket.id);

socket.on('lights', function(data){
console.log(data);
  // serialPort.on('data', function(data) {
  //  console.log('data received: ' + data);
 // });
 if(light_status=="aaa"){
    light_status="eee";
 }else{
   light_status="aaa";
}	

  
  serialPort.write("S"+light_status+"E", function(){
    console.log("DATA sent over serial:  "+  send_status);

  });

});	
	});
//	:wqsocket.on('message_to_server', function(data) {
//		pan = data.pan;
////		tilt = data.tilt;
//		console.log(data);
	//	servo.to(pan);
	//	servo2.to(tilt);
	//	io.sockets.emit("message_to_client",{ message: data["message"] });

	    	// send the pan/tilt info to the arduino 
	    //	five.Board().on("ready", function() {
	    //		var servo = new five.Servo(process.argv[2] || 10);
	    //		var servo2 = new five.Servo(process.argv[2] || 11);
 		
	    //	});

//});
