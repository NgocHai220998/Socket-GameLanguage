const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')

function onClientSendWord(socket, io) {
  socket.on('clientSendWord', (data) => {
    const point = (data.status === 'error') ? -1 : 1
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        users.users.findOne({ email: dataToken.user.email }, (err, user) => {
          if (err) {
            console.log(err)
          } else if (user) {
            if (data.status !== 'error') user.profile.exp += 1
            user.profile.money += point
            user.save((error, newUser) => {
              if (error) {
                io.to(user.email).emit('serverUpdateProfile', {
                  code: 404
                })
              } else {
                io.to(user.email).emit('serverUpdateProfile', {
                  code: 200,
                  user: {
                    profile: newUser.profile,
                    main: newUser.main,
                    pets: newUser.pets
                  }
                })
              }
            })
          } else {
            console.log('Err')
          }
        })
      }
    })
  })
}

module.exports = function run(socket, io) {
  onClientSendWord(socket, io)
}