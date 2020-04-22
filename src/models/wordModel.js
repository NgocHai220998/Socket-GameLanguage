const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const token = require('../constants/token.js');

const wordSchema = new Schema({
  email: String,
  vocabulary: String,
  explain: String,
  example1: String,
  example2: String,
  example3: String,
  example4: String,
  description: String
})

const words = mongoose.model('word', wordSchema);

module.exports = {
  words
}