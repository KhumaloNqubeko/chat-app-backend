var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3000

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, ()=>{
	console.log("Connected to port:" + PORT);
})

// var express = require('express');
// var http = require('http');
// var utils = require('./utils');
// var cors = require('cors');
// var SocketManager = require('./SocketManager');

// var app = express();
// app.use(cors());

// var port = utils.normalizePort(process.env.PORT || '3000');

// var server = http.createServer(app);

// var io = require('socket.io').listen(server);

// io.on('connection', SocketManager);

// server.listen(port);
// server.on('error', utils.onError);

// io.on('connection', (socket) => {

//   console.log('new connection made.');


//   socket.on('join', function (data) {
//     //joining
//     socket.join(data.place);

//     console.log(data.user + ' joined the place : ' + data.place);

//     socket.broadcast.to(data.place).emit('new user joined', { user: data.user, message: 'has joined this place.' });
//   });

//   socket.on('typing', function (data) {
//     // socket.broadcast.emit('typing', data);
//     socket.broadcast.to(data.place).emit('user started typing', { user: data.user, message: ' is typing...' });
//   });


//   socket.on('leave', function (data) {

//     console.log(data.user + 'left the place : ' + data.place);

//     socket.broadcast.to(data.place).emit('left place', { user: data.user, message: 'has left this place.' });

//     socket.leave(data.place);
//   });

//   socket.on('message', function (data) {

//     io.in(data.place).emit('new message', { user: data.user, message: data.message });
//   })
// });
