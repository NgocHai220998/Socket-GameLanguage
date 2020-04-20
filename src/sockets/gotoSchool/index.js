const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const gotoLearn = require('../../models/gotoLearnModel.js')
const message = require('../../models/messageModel.js')
let number = 1998 // Để cho hàm setInterval Chỉ chạy 1 lần khi bật server thôi


// làm giấy nhập học cho các thanh niên hiếu học
function onClientCreateGotoLearn(socket, io) {
  socket.on('clientCreateGotoLearn', (data) => {
    token.verify(data.token).then((dataToken) => {
      if (dataToken) {
        gotoLearn.gotoLearns.findOne({ name: 'hainn' }, async (err, learn) => {
          let user = await users.users.findOne({ email: data.gotoLearn.email })
          user.profile.otherInformation.isGotoLearn = true
          user.profile.otherInformation.maxGotoLearn -= 1
          let newUser = await user.save()
          io.to(newUser.email).emit('serverUpdateProfile', {
            code: 200,
            user: {
              profile: newUser.profile
            }
          })
          try {
            if (learn) {
              switch(data.type) {
                case 'primary':
                  learn.primarySchool.push(data.gotoLearn)
                  break
                case 'high':
                  learn.highSchool.push(data.gotoLearn)
                  break
                case 'university':
                  learn.university.push(data.gotoLearn)
                  io.sockets.emit('userGotoUniversity', {
                    userName: newUser.main.userName
                  })
                  break
                default:
                  break
              }
              let newLearn = await learn.save()
              io.sockets.emit('serverUpdateGotoLearn', {
                code: 200,
                gotoLearn: newLearn
              })
            } else {
              return
            }
          } catch (error) {
            return
          }
        })
      }
    })
  })
}

// thực hiện đi học cho các thành phần đỗ tiểu học
function runGotoLearnPrimary (socket, io) {
  setInterval(() => {
    gotoLearn.gotoLearns.findOne({ name: 'hainn' }, async (err, learn) => {
      try {
        if (learn.primarySchool.length !== 0) {
          let newLearn = null
          for (let i = 0; i < learn.primarySchool.length; ++i) {
            learn.primarySchool[i].percentCompleted += 1
            if (learn.primarySchool[i].percentCompleted == 96) {
              let user = await users.users.findOne({ email: learn.primarySchool[i].email })
              user.profile.exp += learn.primarySchool[i].exp
              user.profile.money += learn.primarySchool[i].money
              user.profile.famePoint += learn.primarySchool[i].famePoint
              user.main.hp += learn.primarySchool[i].hpPoint
              user.profile.otherInformation.isGotoLearn = false
              // delete a done field
              learn.primarySchool.splice(i, 1)
              let newUser = await user.save()
              io.to(newUser.email).emit('serverUpdateProfile', {
                code: 200,
                user: {
                  profile: newUser.profile,
                  main: newUser.main,
                  pets: newUser.pets
                }
              })
            }
          }
          newLearn = await learn.save()
          io.sockets.emit('serverUpdateGotoLearn', {
            code: 200,
            gotoLearn: newLearn
          })
        } else {
          return
        }
      } catch (error) {
        return
      }
    })
  }, 11500)
}
// thực hiện đi học cho các thành phần đỗ trung học
function runGotoLearnHigh (socket, io) {
  setInterval(() => {
    gotoLearn.gotoLearns.findOne({ name: 'hainn' }, async (err, learn) => {
      try {
        if (learn.highSchool.length !== 0) {
          let newLearn = null
          for (let i = 0; i < learn.highSchool.length; ++i) {
            learn.highSchool[i].percentCompleted += 1
            if (learn.highSchool[i].percentCompleted == 96) {
              let user = await users.users.findOne({ email: learn.highSchool[i].email })
              user.profile.exp += learn.highSchool[i].exp
              user.profile.money += learn.highSchool[i].money
              user.profile.famePoint += learn.highSchool[i].famePoint
              user.main.armor += learn.highSchool[i].armorPoint
              user.main.hp += learn.highSchool[i].hpPoint
              user.profile.otherInformation.isGotoLearn = false
              // delete a done field
              learn.highSchool.splice(i, 1)
              let newUser = await user.save()
              io.to(newUser.email).emit('serverUpdateProfile', {
                code: 200,
                user: {
                  profile: newUser.profile,
                  main: newUser.main,
                  pets: newUser.pets
                }
              })
            }
          }
          newLearn = await learn.save()
          io.sockets.emit('serverUpdateGotoLearn', {
            code: 200,
            gotoLearn: newLearn
          })
        } else {
          return
        }
      } catch (error) {
        return
      }
    })
  }, 18500)
}

// thực hiện đi học cho các thành phần đỗ đại học
function runGotoLearnUniversity (socket, io) {
  setInterval(() => {
    gotoLearn.gotoLearns.findOne({ name: 'hainn' }, async (err, learn) => {
      try {
        if (learn.university.length !== 0) {
          let newLearn = null
          for (let i = 0; i < learn.university.length; ++i) {
            learn.university[i].percentCompleted += 1
            if (learn.university[i].percentCompleted == 96) {
              let user = await users.users.findOne({ email: learn.university[i].email })
              user.profile.exp += learn.university[i].exp
              user.profile.money += learn.university[i].money
              user.profile.famePoint += learn.university[i].famePoint
              user.main.armor += learn.university[i].armorPoint
              user.main.hp += learn.university[i].hpPoint
              user.main.martialArt += learn.university[i].martialArtPoint
              user.profile.otherInformation.isGotoLearn = false
              // delete a done field
              learn.university.splice(i, 1)
              let newUser = await user.save()
              io.to(newUser.email).emit('serverUpdateProfile', {
                code: 200,
                user: {
                  profile: newUser.profile,
                  main: newUser.main,
                  pets: newUser.pets
                }
              })
            }
          }
          newLearn = await learn.save()
          io.sockets.emit('serverUpdateGotoLearn', {
            code: 200,
            gotoLearn: newLearn
          })
        } else {
          return
        }
      } catch (error) {
        return
      }
    })
  }, 23000)
}

// người dùng yêu cầu cập nhật tình hình đi học
function onClientRequestUpdateGotoLearn (socket, io) {
  socket.on('clientRequestUpdateGotoLearn', (data) => {
    gotoLearn.gotoLearns.findOne({ name: 'hainn' }, async (err, learn) => {
      try {
        if (learn) {
          io.to(data.email).emit('serverUpdateGotoLearn', {
            code: 200,
            gotoLearn: learn
          })
        } else {
          return
        }
      } catch (error) {
        return
      }
    })
  })
}

// Cướp và gửi thông báo cho đối phương
function onClientSendRobGotoLearnResult (socket, io) {
  socket.on('clientSendRobGotoLearnResult', (data) => {
    token.verify(data.token).then(async (dataToken) => {
      try {
        let user = await users.users.findOne({ email: dataToken.user.email })
        let learn = null
        user.profile.otherInformation.maxRobGotoLearn -= 1
        // let userReverse = users.users.findOne({ email: data.emailReverse })
        if (dataToken.user.email && data.type === 'rob' && data.isWin == true) {
          user.profile.exp += parseInt(data.robGotoLearnData.exp * 0.2)
          user.profile.money += parseInt(data.robGotoLearnData.money * 0.2)
          user.profile.famePoint += parseInt(data.robGotoLearnData.famePoint * 0.2)
          learn = await gotoLearn.gotoLearns.findOne({ name: 'hainn' })
          // message to emailReverse
          let messages = await message.messages.findOne({ email: data.emailReverse })
          messages.count += 1
          messages.messages.unshift({
            time: new Date(),
            title: 'Bị cướp :(',
            content: `Bạn đã bị ${user.main.userName} cướp giữa đường đi học, tổn thất: 
             -${parseInt(data.robGotoLearnData.exp * 0.2)} kinh nghiệm,
             -${parseInt(data.robGotoLearnData.money * 0.2)} tiền yên, -${parseInt(data.robGotoLearnData.famePoint * 0.2)} danh vọng`
          })
          if (messages.messages.length >= 30) {
            messages.messages.splice(-1, 1)
          }
          let newMessages = await messages.save()
          io.to(data.emailReverse).emit('serverRequestUpdateMessage', {
            messages: newMessages
          })
          switch(data.robGotoLearnData.gotoLearnType) {
            case 'primary':
              if (learn.primarySchool.length > 0) {
                for (let i = 0; i < learn.primarySchool.length; ++i) {
                  if (learn.primarySchool[i].email === data.emailReverse) {
                    learn.primarySchool[i].exp -= parseInt(data.robGotoLearnData.exp * 0.2)
                    learn.primarySchool[i].money -= parseInt(data.robGotoLearnData.money * 0.2)
                    learn.primarySchool[i].famePoint -= parseInt(data.robGotoLearnData.famePoint * 0.2)
                    learn.primarySchool[i].max -= 1
                  }
                }
              }
              break
            case 'high':
              if (learn.highSchool.length > 0) {
                for (let i = 0; i < learn.highSchool.length; ++i) {
                  if (learn.highSchool[i].email === data.emailReverse) {
                    learn.highSchool[i].exp -= parseInt(data.robGotoLearnData.exp * 0.2)
                    learn.highSchool[i].money -= parseInt(data.robGotoLearnData.money * 0.2)
                    learn.highSchool[i].famePoint -= parseInt(data.robGotoLearnData.famePoint * 0.2)
                    learn.highSchool[i].max -= 1
                  }
                }
              }
              break
            case 'university':
              if (learn.university.length > 0) {
                for (let i = 0; i < learn.university.length; ++i) {
                  if (learn.university[i].email === data.emailReverse) {
                    learn.university[i].exp -= parseInt(data.robGotoLearnData.exp * 0.2)
                    learn.university[i].money -= parseInt(data.robGotoLearnData.money * 0.2)
                    learn.university[i].famePoint -= parseInt(data.robGotoLearnData.famePoint * 0.2)
                    learn.university[i].max -= 1
                  }
                }
              }
              break
            default:
              break
          }
        } else if (dataToken.user.email && data.type === 'rob' && data.isWin == false) {
          // to message emailReverse
          let messages = await message.messages.findOne({ email: data.emailReverse })
          if (messages.messages.length >= 30) {
            messages.messages.splice(-1, 1)
          }
          messages.messages.unshift({
            time: new Date(),
            title: 'Bị cướp :(',
            content: `Bạn đã bị ${user.main.userName} cướp giữa đường đi học, nhưng bạn đã đấm vỡ mặt đối phương!`
          })
          let newMessages = await messages.save()
          io.to(data.emailReverse).emit('serverRequestUpdateMessage', {
            messages: newMessages
          })
        }
        let newUser = await user.save()
        let newLearn = await learn.save()
        io.sockets.emit('serverUpdateGotoLearn', {
          code: 200,
          gotoLearn: newLearn
        })
        io.to(dataToken.user.email).emit('serverUpdateProfile', {
          code: 200,
          user: {
            profile: newUser.profile
          }
        })
      } catch (error) {
        return
      }
    })
  })
}









module.exports = function run(socket, io) {
  onClientCreateGotoLearn(socket, io)
  onClientRequestUpdateGotoLearn(socket, io)
  onClientSendRobGotoLearnResult(socket, io)
  if (number === 1998) {
    runGotoLearnPrimary(socket, io)
    runGotoLearnHigh(socket, io)
    runGotoLearnUniversity(socket, io)
  }
  number++
  console.log(number)
  // gotoLearn.gotoLearns.create({}, (err, res) => {
  // })
}