
var express = require('express');
var http = require('http');
var utils = require('./utils');
var cors = require('cors');

var app = express();
app.use(cors());

var port = utils.normalizePort(process.env.PORT || '3000');

var server = http.createServer(app);

var io = require('socket.io').listen(server);

// io.origins('transports', ['websocket']);

io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
      //joining
      socket.join(data.place);

      console.log(data.user + ' joined the place : ' + data.place);

      socket.broadcast.to(data.place).emit('new user joined', {user:data.user, message:'has joined this place.'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + 'left the place : ' + data.place);

      socket.broadcast.to(data.place).emit('left place', {user:data.user, message:'has left this place.'});

      socket.leave(data.place);
    });

    socket.on('message',function(data){

      io.in(data.place).emit('new message', {user:data.user, message:data.message});
    })
});

server.listen(port);
server.on('error', utils.onError);
// server.on('listening', utils.onListening(server));