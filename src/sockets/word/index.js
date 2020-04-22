const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const badWords = require('../../models/badWordModel.js')
const words = require('../../models/wordModel.js')

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

function onClientDoneWord(socket, io) {
  socket.on('clientDoneWord', (data) => {
    token.verify(data.token).then( async (dataToken) => {
      if (dataToken) {
        console.log(data)
        let badWord = await badWords.badWords.create({
          email: dataToken.user.email,
          badWord: data.badWord,
          explain: data.explain
        })
        let word = await words.words.deleteOne({ _id: data._id})
        io.to(dataToken.user.email).emit('serverUpdateWord')
        io.to(dataToken.user.email).emit('serverUpdateBadWord')
      }
    })
  })
}
module.exports = function run(socket, io) {
  onClientSendWord(socket, io)
  onClientDoneWord(socket, io)
}