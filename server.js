// server.js
// load the things we need
var express = require('express');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./test.ejs', 'utf-8', function(error, content) {
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


socket.on('connect', function() {
    console.log('connected to pimatic');


    //get list of devices and save for later
    socket.on('devices', function(getDevices) {
        var device = getDevices[1].name;
        //console.log(getDevices);
        //console.log("iets", getDevices[4].name);
        socket.device = getDevices;
        //console.log(getDevices);
        //console.log(socket.device);

    });


    socket.on('variables', function(getVariables) {
        //var device = getVariables[1].name;
        //console.log(getDevices);
        //console.log("iets", getDevices[4].name);
        socket.variable = getVariables;
        //console.log(getVariables);

    });


    socket.on('rules', function(getRules) {
        //var device = getVariables[1].name;
        //console.log(getDevices);
        //console.log("iets", getDevices[4].name);
        socket.Rules = getRules;
        //console.log(socket.Rules);

    });
    socket.on('predicatepresets', function(getPredicatePresets) {
        //var device = getVariables[1].name;
        //console.log(getDevices);
        //console.log("iets", getDevices[4].name);
        console.log(getPredicatePresets);
    });

    socket.on('rules', function(rules) {
        //console.log(rules);
    });

    /*   socket.on('variables', function(variables) {
           console.log("variables:", variables);
       });

       socket.on('variableValueChanged', function(data) {
           console.log("variableValueChanged:", data);
       });*/

    socket.on('variables', function(variables) {
        console.log("variables:", variables);
    });

    socket.on('variableValueChanged', function(data) {
        console.log("variableValueChanged:", data);
    });

    // var io = require('socket.io').listen(server);

    // use res.render to load up an ejs view file

    // use data from getDevices and send to index.ejs
    app.get('/', function(req, res, devices) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        var device = socket.device;
        var variable = socket.variable;
        var rules = socket.Rules;
        console.log(device);
        //console.log(variable);
        //console.log("Session: %j", device);
        // drinks should be replaced by devices
        /* var drinks = [
             { name: socket.device, drunkness: 3 },
             { name: 'Martini', drunkness: 5 },
             { name: 'Scotch', drunkness: 10 }
         ];*/
        //use devices
        res.render('index', {
            //drinks: drinks
            dev: device,
            devvar: variable,
            rules: rules
        });
    });

    app.get('/about', function(req, res) {
        res.render('pages/about');
    });

    app.listen(8080);
    console.log('8080 is the magic port');


});