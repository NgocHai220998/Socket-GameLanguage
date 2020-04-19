const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const ranks = require('../../models/rankModel.js')

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
  await updateRank(data.email.email, data.emailReverse.rank, io)
  await updateRank(data.emailReverse.email, data.email.rank, io)
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

function updateRank(email, rank, io) {
  users.users.findOne({ email }, (err, user) => {
    if (err) {
      return
    } else if (user) {
      user.profile.rank = rank
      user.save((err, newUser) => {
        if (err) {
          return
        } else if (newUser) {
          io.to(email).emit('serverUpdateProfile', {
            code: 200,
            user: {
              profile: newUser.profile
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

module.exports = function run(socket, io) {
  onClientFightWin(socket, io)
}