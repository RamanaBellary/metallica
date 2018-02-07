var express = require('express');
var socket = require('socket.io');

var eventEmitter = require('./eventsService').eventEmitterService.getInstance();

var app = express();

var server = app.listen(3012, () => {
    console.log('Notificatio service running on port #3012...');
});

//Create an event handler:
var tradeEventHandler = function () {
  console.log('trade got updated...!');
    io.sockets.emit('tradeUpdated', 'tradeData got updated...');
}

//Assign the event handler to an event:
eventEmitter.on('tradeUpdated', tradeEventHandler);

//socket setup
var io = socket(server);

//Below piece of code is just a dummy method to emit notification to client on speicfic intervals..
setInterval(() => {io.sockets.emit('tradeUpdated',{msg:'Test msg from service'});}, 10000);

io.on('connection', (socket) => {
    console.log('made socket connection:' + socket.id);

    //io.sockets.emit('tradeUpdated', 'Test msg from service');

    socket.on('tradeUpdated', (data) => {
        io.sockets.emit('tradeUpdated', 'tradeData got updated...');
    });
});

