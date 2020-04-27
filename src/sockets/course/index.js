const token = require('../../constants/token.js')
const users = require('../../models/userModel.js')
const course = require('../../models/courseModel.js')
const words = require('../../models/wordModel.js')

function onClientGetCourses(socket, io) {
  socket.on('clientGetCourses', (data) => {
    token.verify(data.token).then( async (dataToken) => {
      if (dataToken) {
        try {
          let courses = await course.courses.find()
          io.to(dataToken.user.email).emit('serverGetCourses', {
            courses: courses
          })
        } catch (error) {
          return
        }
      }
    })
  })
}


function onClientGetCourse(socket, io) {
  socket.on('clientGetCourse', (data) => {
    token.verify(data.token).then( async (dataToken) => {
      if (dataToken) {
        try {
          let courseData = await course.courses.findOne({ name: data.name })
          io.to(dataToken.user.email).emit('serverGetCourse', {
            course: courseData
          })
        } catch (error) {
          return
        }
      }
    })
  })
}

function onClientAddWordFromCourse(socket, io) {
  socket.on('clientAddWordFromCourse', (data) => {
    token.verify(data.token).then( async (dataToken) => {
      if (dataToken) {
        try {
          let newWord = await words.words.create({
            email: dataToken.user.email,
            vocabulary: data.vocabulary,
            explain: data.explain
          })
          io.to(dataToken.user.email).emit('addWordFromCourseDone', 'Done')
        } catch (error) {
          return
        }
      }
    })
  })
}


module.exports = function run(socket, io) {
  onClientGetCourses(socket, io)
  onClientGetCourse(socket, io)
  onClientAddWordFromCourse(socket, io)
}