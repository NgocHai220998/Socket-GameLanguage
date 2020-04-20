const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missionSchema = new Schema({
  email: String,
  dayly: {
    vocabulary: {
      type: Number,
      default: 0
    },
    sentence: {
      type: Number,
      default: 0
    },
    review: {
      type: Number,
      default: 0
    }
  },
  weekly: {
    vocabulary: {
      type: Number,
      default: 0
    },
    sentence: {
      type: Number,
      default: 0
    },
    review: {
      type: Number,
      default: 0
    }
  },
  monthly: {
    vocabulary: {
      type: Number,
      default: 0
    },
    sentence: {
      type: Number,
      default: 0
    },
    review: {
      type: Number,
      default: 0
    }
  },
  max: {
    type: Number,
    default: 15
  }
})

const missions = mongoose.model('mission', missionSchema);

module.exports = {
  missions
}