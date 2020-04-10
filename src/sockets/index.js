const chatbox = require('./chatbox/index')


module.exports = {
    run: function run(socket, io) {
        chatbox(socket, io)
    }
}