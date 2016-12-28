var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});
//tes t
var io = require('socket.io-client');

var host = '192.168.0.120';
var port = 80;
var u = encodeURIComponent('admin');
var p = encodeURIComponent('b@$phien');
var socket = io('http://' + host + ':' + port + '/?username=' + u + '&password=' + p, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  timeout: 20000,
  forceNew: true
});

socket.on('connect', function() {
  console.log('connected to pimatic');
});

socket.on('devices', function(devices){

  console.log("ietS", devices[4].name);

  socket.emit('message', 'You are connected!' + devices[3].name);
  var bla = ('message', 'You are connected!' + devices[3].name);
 // console.log( 'Message received ' + devices);
});


// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', 'You are connected!');
   

    socket.on('message', function (message) {
        console.log('A client is speaking to me! They’re saying: ' + message);
    });
});


server.listen(8080);
