const io = require('./chat-server.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING } = require('./Events')

const { createUser, createMessage, createChat } = require('./Factories')

let connectedUsers = {};
let places = {};

module.exports = function (socket) {

    console.log('Socket id: ', socket.id);

    socket.on(USER_CONNECTED, (user) => {
        console.log(connectedUsers);
        // socket.user = user

        if (isUser(connectedUsers, user.name)) {
            io.emit(USER_CONNECTED, { isUser: true, user: null })
        } else {
            connectedUsers = addUser(connectedUsers, user)
            io.emit(USER_CONNECTED, { isUser: false, user: createUser({ name: user.name }) })
        }

    });

    socket.on(TYPING, ({ user, isTyping }) => {
        io.emit(TYPING, { user, isTyping })
    });

    socket.on('join', function (data) {
        //joining
        socket.join(data.place);

        socket.broadcast.to(data.place).emit('new user joined', { places: places, user: data.user, message: 'has joined this place.' });
    });

    socket.on('place', function (data) {
        console.log(data);
        places = addPlace(places, data.place);
        console.log(places);
        io.emit('place', { places });
    });


    socket.on('leave', function (data) {

        console.log(data.user + 'left the place : ' + data.place);

        socket.broadcast.to(data.place).emit('left place', { user: data.user, message: 'has left this place.' });

        socket.leave(data.place);
    });

    socket.on('message', function (data) {

        io.in(data.place).emit('new message', { user: data.user, message: data.message });
    })
}


function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function isUser(userList, username) {
    return username in userList
}

function addPlace(placeList, place) {
    let newList = Object.assign({}, placeList);
    newList[place] = place;
    return newList;
}