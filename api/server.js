const http = require('http');
const app = require('./src/app'); // Your Express app
const socketio = require('socket.io');

// Normalize port
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '4200');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketio(server, {
    cors: {
        origin: '*', // Allows requests from any origin
        methods: ['GET', 'POST' , 'PUT', 'DELETE'],
        credentials: true
    }
});


// Import your chat controller and pass the io instance
const sessionCtrl = require('./src/controllers/session');
const groupCtrl = require('./src/controllers/chat');
sessionCtrl.init(io);
groupCtrl.init(io);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
