var io = require('socket.io-client');

var host = 'dinges.synology.me';
var port = 9191;
var u = encodeURIComponent('admin');
var p = encodeURIComponent('leonisdebeste');
var socket = io('http://' + host + ':' + port + '/?username=' + u + '&password=' + p, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 3000,
    timeout: 20000,
    forceNew: true
});

socket.on('connect', function() {
    console.log('connected');
});

socket.on('event', function(data) {
    console.log("event:\n")
    console.log(data);
});

socket.on('disconnect', function(data) {
    console.log("disconnected:\n");
    console.log(data);
});

socket.on('deviceAdded', function(device) {
    console.log("deviceAdded:\n");
    console.log(device)
});