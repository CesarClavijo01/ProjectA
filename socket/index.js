const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log("A user connected.");

        socket.emit('message', 'This is the server message');
    
        socket.on('message', (msg) => {
            console.log('Recieved message:', msg);

            socket.broadcast.emit('message', msg);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected.');
        });
    });
};

module.exports = socketHandler;