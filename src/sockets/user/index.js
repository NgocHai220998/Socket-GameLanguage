const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')

function onClientLevelUp(socket, io) {
  socket.on('clientLevelUp', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        users.users.findOne({ email: dataToken.user.email }, (err, user) => {
          if (err) {
            console.log(err)
          } else if (user) {
            console.log(data.profile)
            user.profile = {
              ...user.profile,
              ...data.profile
            }
            user.main = {
              ...user.main,
              ...data.main
            }
            user.pets = data.pets
            user.save((error, newUser) => {
              if (error) {
                io.to(user.email).emit('serverLevelUp', {
                  code: 404
                })
              } else {
                io.to(user.email).emit('serverLevelUp', {
                  code: 200,
                  data: newUser
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

function onClientUpdateProfile(socket, io) {
  socket.on('clientUpdateProfile', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        users.users.findOne({ email: dataToken.user.email }, (err, user) => {
          if (err) {
            console.log(err)
          } else if (user) {
            user.profile = {
              ...user.profile,
              ...data.profile
            }
            user.save((error, newUser) => {
              if (error) {
                io.to(user.email).emit('serverUpdateProfile', {
                  code: 404
                })
              } else {
                io.to(user.email).emit('serverUpdateProfile', {
                  code: 200,
                  data: newUser
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
  onClientLevelUp(socket, io)
  onClientUpdateProfile(socket, io)
}