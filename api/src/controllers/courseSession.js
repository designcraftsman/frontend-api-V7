const botName = 'Immersive Bot';
const formatMessage = require('../models/message');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('../models/chat');

let io;

exports.init = (socketIoInstance) => {
    io = socketIoInstance;
    io.on('connection', (socket) => {
        console.log('A user has connected');
        socket.on('joinRoom', ({ username, room , userImage }) => {
            const user = userJoin(socket.id, username, room , userImage);
            socket.join(user.room);

            // Welcome current user
            socket.emit('message', formatMessage(botName, 'Welcome to the course !'));

            // Broadcast when a user connects
            socket.broadcast.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has joined the course!`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room),
            });

             // Listen for chatMessage
            socket.on('chatMessage', (text) => {
            const user = getCurrentUser(socket.id);
            if(socket.id === user.id) {
                io.to(user.room).emit('message', formatMessage(user.username, text, true , user.userImage));
            }else{
                io.to(user.room).emit('message', formatMessage(user.username, text, false , user.userImage));
            }
            });
        });


        // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.to(user.room).emit(
                    'message',
                    formatMessage(botName, `${user.username} has left the chat`)
                );

                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room),
                });
            }
        });
    });
};
