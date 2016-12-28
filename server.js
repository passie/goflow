// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');


var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function (req, res) {
    fs.readFile('./index.ejs', 'utf-8', function (error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});
//test
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

socket.on('connect', function () {
    console.log('connected to pimatic');
});


//get list of devices
var getDevices = socket.on('devices', function (devices, callback) {
    //console.log("ietS", devices[4].name);
    //console.log(devices)

    var iets = devices[4].name;

});

var io = require('socket.io').listen(server);
// use res.render to load up an ejs view file

// change to device.name
app.get('/', function (req, res, devices) {
    console.log(devices);
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];

    res.render('index', {
        drinks: drinks
    });
});

app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');