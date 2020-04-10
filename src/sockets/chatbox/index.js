

function onClientSendMessage(socket, io) {
    socket.on('clientSend', (message) => {
        io.sockets.emit('getMessage', message)
    })
}

module.exports = function run(socket, io) {
    onClientSendMessage(socket, io)
}