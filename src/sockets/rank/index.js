const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const ranks = require('../../models/rankModel.js')
const message = require('../../models/messageModel.js')

// 1 thanh niên nào đó đánh thắng trận võ đài
function onClientFightWin(socket, io) {
  socket.on('clientFightWin', (data) => {
    token.verify(data.token).then(async (dataToken) => {
      if (dataToken.user.email && data.type === 'rank') {
        rankFight(io, data)
      }
    })
  })
}

async function rankFight (io, data) {
  await updateRank(data.email.email, data.emailReverse.rank, io, 'win', data.emailReverse.email)
  await updateRank(data.emailReverse.email, data.email.rank, io, 'lose', data.email.email)
  ranks.ranks.findOne({ name: 'hainn' }, (err, rank) => {
    if (err) {
      return
    } else if (rank) {
      const tempUser = {
        userName: rank.listRank[data.email.rank - 1].userName,
        email: rank.listRank[data.email.rank - 1].email,
      }
      //--
      rank.listRank[data.email.rank - 1].userName = rank.listRank[data.emailReverse.rank - 1].userName
      rank.listRank[data.email.rank - 1].email = rank.listRank[data.emailReverse.rank - 1].email
      //---
      rank.listRank[data.emailReverse.rank - 1].userName = tempUser.userName
      rank.listRank[data.emailReverse.rank - 1].email = tempUser.email
      rank.save((err, newRank) => {
        if (err) {
          return
        } else if (newRank) {
          io.sockets.emit('serverUpdateRank', {
            code: 200,
            rank: newRank,
            info: {
              userName: data.email.userName,
              userNameReverse: data.emailReverse.userName,
              rank: data.emailReverse.rank
            }
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

// cập nhật rank cho 2 người sau khi kết thúc trận đấu
function updateRank(email, rank, io, type, emailReverse) {
  users.users.findOne({ email }, async (err, user) => {
    try {
      if (user) {
        if (type == 'win') {
          user.profile.otherInformation.maxFight -= 1
        } else {
          let messages = await message.messages.findOne({ email })
          let userReverse = await users.users.findOne({ email: emailReverse })
          messages.messages.unshift({
            time: new Date(),
            title: 'Bị đập ở võ đài :(',
            content: `Bạn đã bị ${userReverse.main.userName} đấm vỡ mặt ở võ đài, bị tụt xuống hạng ${rank} võ đài`
          })
          messages.count += 1
          if (messages.messages.length >= 30) {
            messages.messages.splice(-1, 1)
          }
          let newMessages = await messages.save()
          io.to(email).emit('serverRequestUpdateMessage', {
            messages: newMessages
          })
        }
        user.profile.rank = rank
        let newUser = await user.save()
        io.to(email).emit('serverUpdateProfile', {
          code: 200,
          user: {
            profile: newUser.profile
          }
        })
      }
    } catch (error) {
      return
    }
  })
}

module.exports = function run(socket, io) {
  onClientFightWin(socket, io)
}