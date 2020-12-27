const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: String,
  listLesson: [{
    name: String,
    words: [{
      vocabulary: String,
      explain: String
    }]
  }],
  description: String
})

const courses = mongoose.model('course', courseSchema);

module.exports = {
  courses
}