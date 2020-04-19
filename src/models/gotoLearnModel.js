const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gotoLearnSchema = new Schema({
  name: {
    type: String,
    default: 'hainn'
  },
  primarySchool: [{
    userName: String,
    email: String,
    srcImage: String,
    percentCompleted: {
      type: Number,
      default: 3
    },
    exp: {
      type: Number,
      default: 0
    },
    money: {
      type: Number,
      default: 0
    },
    famePoint: {
      type: Number,
      default: 0
    },
    martialArtPoint: {
      type: Number,
      default: 0
    },
    hpPoint: {
      type: Number,
      default: 0
    },
    armorPoint: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 3
    }
  }],
  highSchool: [{
    userName: String,
    email: String,
    srcImage: String,
    percentCompleted: {
      type: Number,
      default: 3
    },
    exp: {
      type: Number,
      default: 0
    },
    money: {
      type: Number,
      default: 0
    },
    famePoint: {
      type: Number,
      default: 0
    },
    martialArtPoint: {
      type: Number,
      default: 0
    },
    hpPoint: {
      type: Number,
      default: 0
    },
    armorPoint: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 3
    }
  }],
  university: [{
    userName: String,
    email: String,
    srcImage: String,
    percentCompleted: {
      type: Number,
      default: 3
    },
    exp: {
      type: Number,
      default: 0
    },
    money: {
      type: Number,
      default: 0
    },
    famePoint: {
      type: Number,
      default: 0
    },
    martialArtPoint: {
      type: Number,
      default: 0
    },
    hpPoint: {
      type: Number,
      default: 0
    },
    armorPoint: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 3
    }
  }]
})

const gotoLearns = mongoose.model('gotoLearn', gotoLearnSchema);

module.exports = {
  gotoLearns
}