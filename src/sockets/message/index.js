const token = require('../../constants/token.js')
const message = require('../../models/messageModel.js')


// người dùng yêu cầu cập nhật lại danh sách thông báo
function onClientRequestUpdateMessage(socket, io) {
  socket.on('clientRequestUpdateMessage', (data) => {
    message.messages.findOne({ email: data.email }, (err, newMessages) => {
      if (err) {
        return
      } else if (newMessages) {
        io.to(data.email).emit('serverRequestUpdateMessage', {
          messages: newMessages
        })
      } else {
        return
      }
    })
  })
}

// người dùng click vào thông báo thì sẽ bỏ đánh dấu (những tin hót về 0)
function onClientClickMessage(socket, io) {
  socket.on('clientClickMessage', (data) => {
    message.messages.findOne({ email: data.email }, async (err, newMessages) => {
      try {
        newMessages.count = 0
        let result = await newMessages.save()
        io.to(data.email).emit('serverRequestUpdateMessage', {
          messages: result
        })
      } catch (error) {
        return
      }
    })
  })
}

module.exports = function run(socket, io) {
  onClientRequestUpdateMessage(socket, io)
  onClientClickMessage(socket, io)
}