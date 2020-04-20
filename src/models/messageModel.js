const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  email: String,
  messages: [{
    time: Date,
    title: String,
    content: String
  }],
  count: {
    type: Number,
    default: 0
  }
})

const messages = mongoose.model('message', messageSchema);

module.exports = {
  messages
}