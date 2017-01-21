var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var piBackend = require('socket.io-client');


// talk to backend
var host = 'dinges.synology.me';
var port = 4545;
var u = encodeURIComponent('admin');
var p = encodeURIComponent('leonisdebeste');
var socket = piBackend('http://' + host + ':' + port + '/?username=' + u + '&password=' + p, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 3000,
    timeout: 20000,
    forceNew: true
});

// nomal HTTP requst
app.get('/', function(req, res) {
    res.sendfile('devices.html');
});

// Socket connections

socket.on('connect', function() {
    console.log('connected to pimatic');

    socket.on('devices', function(getDevices) {
        socket.device = getDevices;
        //hier werkt het 
        console.log(getDevices);
    });

    io.on('connection', function(socket) {
        var device = socket.device;
        // hier niet?
        console.log(device);
        socket.on('chat message', function(msg) {
            console.log('chat message' + device);
            io.emit('chat message', 'message: ' + msg);
        });
    });


    // Starting stuff up because stuff need to load first
    http.listen(8080, function() {
        console.log('listening on *:8080');
    });
});