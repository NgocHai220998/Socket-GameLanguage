const chatbox = require('./chatbox/index')
const word = require('./word/index')
const user = require('./user/index')

module.exports = {
    run: function run(socket, io) {
        socket.join(socket.request._query.name)
        chatbox(socket, io)
        word(socket, io)
        user(socket, io)
    }
}