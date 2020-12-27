const chatbox = require('./chatbox/index')
const word = require('./word/index')
const user = require('./user/index')
const rank = require('./rank/index')
const mission = require('./mission/index')
const gotoSchool = require('./gotoSchool/index')
const message = require('./message/index')
const course = require('./course/index')

module.exports = {
    run: function run(socket, io) {
        socket.join(socket.request._query.name)
        chatbox(socket, io)
        word(socket, io)
        user(socket, io)
        rank(socket, io)
        mission(socket, io)
        gotoSchool(socket, io)
        message(socket, io)
        course(socket, io)
    }
}