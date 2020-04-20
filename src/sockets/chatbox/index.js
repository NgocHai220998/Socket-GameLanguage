

function onClientSendMessage(socket, io) {
    socket.on('clientSendMessage', (message) => {
        io.sockets.emit('ServerSendMessage', message)
    })
}

module.exports = function run(socket, io) {
    onClientSendMessage(socket, io)
}