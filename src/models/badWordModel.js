const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badWordSchema = new Schema({
  email: String,
  badWord: String,
  explain: String
})

const badWords = mongoose.model('badWord', badWordSchema);

module.exports = {
  badWords
}