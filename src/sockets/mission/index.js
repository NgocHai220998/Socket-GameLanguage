const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const missisons = require('../../models/missionModel.js')

function onClientGetMissions(socket, io) {
  socket.on('clientGetMission', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        missisons.missions.findOne({ email: dataToken.user.email }, (err, mission) => {
          if (err) {
            return
          } else if (mission) {
            io.to(dataToken.user.email).emit('serverGetMission', {
              mission: mission
            })
          } else {
            return
          }
        })
      }
    })
  })
}

function onClientCreateWord(socket, io) {
  socket.on('clientCreateWord', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        missisons.missions.findOne({ email: dataToken.user.email }, (err, mission) => {
          if (err) {
            return
          } else if (mission) {
            mission.dayly.vocabulary += 1
            mission.weekly.vocabulary += 1
            mission.monthly.vocabulary += 1
            mission.save((err, newMission) => {
              if (err) {
                return
              } else if (newMission) {
                io.to(dataToken.user.email).emit('serverUpdateMission', {
                  mission: newMission
                })
              } else {
                return
              }
            })
          } else {
            return
          }
        })
      }
    })
  })
}

function onClientCreateSentence(socket, io) {
  socket.on('clientCreateSentence', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        missisons.missions.findOne({ email: dataToken.user.email }, (err, mission) => {
          if (err) {
            return
          } else if (mission) {
            mission.dayly.sentence += 1
            mission.weekly.sentence += 1
            mission.monthly.sentence += 1
            mission.save((err, newMission) => {
              if (err) {
                return
              } else if (newMission) {
                io.to(dataToken.user.email).emit('serverUpdateMission', {
                  mission: newMission
                })
              } else {
                return
              }
            })
          } else {
            return
          }
        })
      }
    })
  })
}

function onClientDoneDaylyMission(socket, io) {
  socket.on('clientDoneDaylyMission', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        missisons.missions.findOne({ email: dataToken.user.email }, async (err, mission) => {
          if (err) {
            return
          } else if (mission) {
            try {
              let user = await users.users.findOne({ email: dataToken.user.email })
              user.profile.exp += (5 * user.profile.level)
              user.profile.money += (4 * user.profile.level)
              switch (data.type) {
                case 'vocabulary':
                  mission.dayly.vocabulary = 0
                  break
                case 'sentence':
                  mission.dayly.sentence = 0
                  break
                case 'review':
                  mission.dayly.review = 0
                  break
                default:
                  break
              }
              mission.max -= 1
              let newUser = await user.save()
              let newMission = await mission.save()
              if (newUser && newMission) {
                io.to(dataToken.user.email).emit('serverDoneMission', {
                  mission: newMission,
                  exp: (5 * user.profile.level),
                  money: (4 * user.profile.level)
                })
                io.to(dataToken.user.email).emit('serverUpdateProfile', {
                  user: {
                    profile: newUser.profile
                  },
                  code: 200
                })
              } else {
                return
              }
            } catch (error) {
              return
            }
          } else {
            return
          }
        })
      }
    })
  })
}

function onClientDoneWeeklyMission(socket, io) {
  socket.on('clientDoneWeeklyMission', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        missisons.missions.findOne({ email: dataToken.user.email }, async (err, mission) => {
          if (err) {
            return
          } else if (mission) {
            try {
              let user = await users.users.findOne({ email: dataToken.user.email })
              user.profile.exp += (17 * user.profile.level)
              user.profile.money += (15 * user.profile.level)
              switch (data.type) {
                case 'vocabulary':
                  mission.weekly.vocabulary = 0
                  break
                case 'sentence':
                  mission.weekly.sentence = 0
                  break
                case 'review':
                  mission.weekly.review = 0
                  break
                default:
                  break
              }
              mission.max -= 1
              let newUser = await user.save()
              let newMission = await mission.save()
              if (newUser && newMission) {
                io.to(dataToken.user.email).emit('serverDoneMission', {
                  mission: newMission,
                  exp: (17 * user.profile.level),
                  money: (15 * user.profile.level)
                })
                io.to(dataToken.user.email).emit('serverUpdateProfile', {
                  user: {
                    profile: newUser.profile
                  },
                  code: 200
                })
              } else {
                return
              }
            } catch (error) {
              return
            }
          } else {
            return
          }
        })
      }
    })
  })
}

function onClientDoneMonthlyMission(socket, io) {
  socket.on('clientDoneMonthlyMission', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        missisons.missions.findOne({ email: dataToken.user.email }, async (err, mission) => {
          if (err) {
            return
          } else if (mission) {
            try {
              let user = await users.users.findOne({ email: dataToken.user.email })
              user.profile.exp += (33 * user.profile.level)
              user.profile.money += (31 * user.profile.level)
              switch (data.type) {
                case 'vocabulary':
                  mission.monthly.vocabulary = 0
                  break
                case 'sentence':
                  mission.monthly.sentence = 0
                  break
                case 'review':
                  mission.monthly.review = 0
                  break
                default:
                  break
              }
              mission.max -= 1
              let newUser = await user.save()
              let newMission = await mission.save()
              if (newUser && newMission) {
                io.to(dataToken.user.email).emit('serverDoneMission', {
                  mission: newMission,
                  exp: (33 * user.profile.level),
                  money: (31 * user.profile.level)
                })
                io.to(dataToken.user.email).emit('serverUpdateProfile', {
                  user: {
                    profile: newUser.profile
                  },
                  code: 200
                })
              } else {
                return
              }
            } catch (error) {
              return
            }
          } else {
            return
          }
        })
      }
    })
  })
}

module.exports = function run(socket, io) {
  onClientGetMissions(socket, io)
  onClientCreateSentence(socket, io)
  onClientCreateWord(socket, io)
  onClientDoneDaylyMission(socket, io)
  onClientDoneMonthlyMission(socket, io)
  onClientDoneWeeklyMission(socket, io)
}