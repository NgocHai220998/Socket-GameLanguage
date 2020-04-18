const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missionSchema = new Schema({
  name: {
    type: String,
    default: 'mission-gl'
  },
  
})

const missions = mongoose.model('mission', missionSchema);

module.exports = {
  missions
}