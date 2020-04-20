const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const missions = require('../../models/missionModel.js')
const messages = require('../../models/messageModel.js')

function onClientLevelUp(socket, io) {
  socket.on('clientLevelUp', (data) => {
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
                  user: {
                    profile: newUser.profile,
                    main: newUser.main,
                    pets: newUser.pets
                  }
                })
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

function onClientBuyFigure (socket, io) {
  socket.on('clientBuyFigure', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        users.users.findOne({ email: dataToken.user.email }, (err, user) => {
          if (err) {
            console.log(err)
          } else if (user && (user.profile.money >= data.condition.money) && user.profile.diamond - data.condition.diamond) {
            user.profile = {
              ...user.profile,
              diamond: user.profile.diamond - data.condition.diamond,
              money: user.profile.money - data.condition.money
            }
            user.pets.push(data.pet)
            user.save((error, newUser) => {
              if (error) {
                io.to(user.email).emit('serverBuyFigure', {
                  code: 404
                })
              } else {
                io.to(user.email).emit('serverBuyFigure', {
                  code: 200,
                  user: {
                    profile: newUser.profile,
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

function onCreateMissions (socket, io) {
  socket.on('clientCreateMissions', async (data) => {
    try {
      const mission = {
        email: data.email 
      }
      let newMission = await missions.missions.create(mission)
      const message = {
        email: data.email
      }
      let newMessage = await messages.messages.create(message)
    } catch (error) {
      return
    }
  })
}

function onClientGetUserInfo (socket, io) {
  socket.on('clientGetUserInfo', (data) => {
    token.verify(data.token).then( async (dataToken) => {
      if (dataToken) {
        try {
          let user = users.users.findOne({ email: dataToken.user.email })
          io.to(dataToken.user.email).emit('serverSendUserInfo', {
            user: {
              email: user.email,
              main: user.main,
              pets: user.pets,
              profile: user.profile
            }
          })
        } catch (error) {
          return
        }
      }
    })
  })
}

module.exports = function run(socket, io) {
  onClientLevelUp(socket, io)
  onClientUpdateProfile(socket, io)
  onClientBuyFigure(socket, io)
  onCreateMissions(socket, io)
  onClientGetUserInfo(socket, io)
}