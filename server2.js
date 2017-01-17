var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// nomal HTTP requst
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

// Socket connections
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.emit('deviceEditDone', 'messageBody');
    socket.on('deviceEdit', function() {
        socket.emit('deviceEditDone', 'messageBody');
    })


});


// Starting stuff up because stuff need to load first
http.listen(3000, function() {
    console.log('listening on *:3000');
});