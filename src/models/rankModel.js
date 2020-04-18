const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankSchema = new Schema({
  name: {
    type: String,
    default: 'hainn'
  },
  listRank: [{
    userName: String,
    email: String,
    rank: Number
  }]
})

const ranks = mongoose.model('rank', rankSchema);

module.exports = {
  ranks
}