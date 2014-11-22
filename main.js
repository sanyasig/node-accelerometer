var http = require('http'),
fs = require('fs');
var light_status = 'aaa';
var send_status = 'eee';
//var five = require("johnny-five");
//var board = new five.Broad();
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
 // parser: erialPort.parsers.readline("\r")
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

var app = http.createServer(function (request, response) {
	fs.readFile("test.html", 'utf-8', function (error, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
	});
}).listen(1337);


/*serialPort.on("open", function () {
  console.log('open');
  serialPort.pause(function(){
    console.log("serial connection pasued");
  });
});
*/
var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
console.log(socket.id);
socket.on('message_to_server', function(data) {
  var sendData = ""
  console.log(data);
  if(data.pan < 90){
    sendData = sendData+"r";
  }

  if(data.pan > 90){
    sendData = sendData+"l";
  }

  if(data.tilt < 90){
  sendData = sendData+"f"
  }        

  if(data.tilt > 90){
   sendData = sendData+"b";
    }
serialPort.write(sendData + "#");

});
});


